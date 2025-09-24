
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { randomUUID } from 'crypto'
import { verifyTurnstileToken } from '@/app/api/_utils/verify-turnstile'
import { z } from 'zod'
import { sendWelcomeNewsletter } from '@/lib/sendgrid'

export const dynamic = "force-dynamic"

const NewsletterSchema = z.object({
  email: z.string().trim().email('Format d\'email invalide').max(320),
  name: z.string().trim().max(200).optional().or(z.literal('').transform(() => undefined)),
  company: z.string().trim().max(200).optional().or(z.literal('').transform(() => undefined)),
  message: z.string().trim().max(2000).optional().or(z.literal('').transform(() => undefined)),
})

export async function POST(request: Request) {
  try {
    const body = await request?.json()
    const parsed = NewsletterSchema.safeParse(body || {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation échouée', details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const { email, name, company, message } = parsed.data

    // Turnstile server-side verification (if enabled)
    const cfToken = (body?.cfToken as string) || ''
    if (process.env.TURNSTILE_SECRET_KEY) {
      const v = await verifyTurnstileToken(cfToken)
      if (!v.success) {
        return NextResponse.json({ error: 'Vérification anti-bot échouée' }, { status: 400 })
      }
    }

    // Check if email already exists
    const existingSubscriber = await prisma?.newsletter?.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingSubscriber) {
      if (existingSubscriber.unsubscribedAt) {
        return NextResponse.json(
          { error: 'Cet email s\'est désinscrit. Contactez-nous pour réactiver.' },
          { status: 403 }
        )
      }
      if (!existingSubscriber.confirmed) {
        return NextResponse.json(
          { error: 'Cet email est en attente de confirmation. Vérifiez votre boîte mail.' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: 'Cet email est déjà inscrit à notre newsletter' },
        { status: 409 }
      )
    }

    // Create new subscriber
    const token = randomUUID()
    const unsubscribeToken = randomUUID()
    const subscriber = await prisma?.newsletter?.create({
      data: {
        email: email.toLowerCase(),
        name: name || null,
        company: company || null,
        message: message || null,
        confirmationToken: token,
        confirmed: false,
        unsubscribeToken,
      }
    })

    // Send welcome email (non-blocking)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yunicity.com'
      const confirmUrl = `${baseUrl}/confirm?token=${encodeURIComponent(token)}`
      await sendWelcomeNewsletter({
        email: subscriber.email,
        name: subscriber.name || undefined,
        company: subscriber.company || undefined,
        confirmUrl
      })
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Continue even if email fails - subscription is still successful
    }

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie ! Un email de bienvenue vous a été envoyé.',
      subscriber: {
        id: subscriber?.id,
        email: subscriber?.email,
        createdAt: subscriber?.createdAt
      }
    })

  } catch (error) {
    console.error('Newsletter API Error:', error)
    
    // Handle unique constraint violation (in case of race condition)
    if (error instanceof Error && error?.message?.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Cet email est déjà inscrit à notre newsletter' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  } finally {
    // prisma géré globalement via lib/db
  }
}

export async function GET() {
  try {
    const count = await prisma?.newsletter?.count()
    
    return NextResponse.json({
      success: true,
      totalSubscribers: count || 0
    })
  } catch (error) {
    console.error('Newsletter GET Error:', error)
    
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    )
  } finally {
    // noop
  }
}
