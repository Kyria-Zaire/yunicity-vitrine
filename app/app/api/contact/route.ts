
import { NextResponse } from 'next/server'
import { sendInvestorContactNotification } from '@/lib/sendgrid'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { verifyTurnstileToken } from '@/app/api/_utils/verify-turnstile'

export const dynamic = "force-dynamic"

const ContactSchema = z.object({
  name: z.string().trim().min(1, 'Le nom est requis').max(200),
  email: z.string().trim().email('Format d\'email invalide').max(320),
  company: z.string().trim().max(200).optional().or(z.literal('').transform(() => undefined)),
  investorType: z.string().trim().max(100).optional().or(z.literal('').transform(() => undefined)),
  investmentRange: z.string().trim().max(100).optional().or(z.literal('').transform(() => undefined)),
  message: z.string().trim().min(1, 'Le message est requis').max(5000),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation échouée', details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const { name, email, company, investorType, investmentRange, message } = parsed.data

    // Vérifier Turnstile côté serveur si clé présente
    const cfToken = (body?.cfToken as string) || ''
    if (process.env.TURNSTILE_SECRET_KEY) {
      const v = await verifyTurnstileToken(cfToken)
      if (!v.success) {
        return NextResponse.json({ error: 'Vérification anti-bot échouée' }, { status: 400 })
      }
    }

    // Store in database
    const contact = await prisma.investorContact.create({
      data: {
        name,
        email: email.toLowerCase(),
        company: company || null,
        investorType: investorType || null,
        investmentRange: investmentRange || null,
        message,
      }
    })

    // Send notification email to admin
    try {
      await sendInvestorContactNotification({
        name: contact.name,
        email: contact.email,
        company: contact.company,
        investorType: contact.investorType,
        investmentRange: contact.investmentRange,
        message: contact.message
      })
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError)
      // Continue even if email fails - contact is still saved in DB
    }

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès !',
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt
      }
    })

  } catch (error) {
    console.error('Contact API Error:', error)
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  } finally {
    // prisma géré globalement via lib/db
  }
}

export async function GET(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined
    if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
    const count = await prisma.investorContact.count()
    const recent = await prisma.investorContact.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        company: true,
        investorType: true,
        investmentRange: true,
        createdAt: true
      }
    })
    
    return NextResponse.json({
      success: true,
      totalContacts: count,
      recentContacts: recent
    })
  } catch (error) {
    console.error('Contact GET Error:', error)
    
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    )
  } finally {
    // noop
  }
}
