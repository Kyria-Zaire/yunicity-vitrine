
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendInvestorContactNotification } from '@/lib/sendgrid'

export const dynamic = "force-dynamic"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, investorType, investmentRange, message } = body

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Les champs nom, email et message sont requis' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Store in database
    const contact = await prisma.investorContact.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || null,
        investorType: investorType || null,
        investmentRange: investmentRange || null,
        message: message.trim(),
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
    await prisma.$disconnect()
  }
}

export async function GET() {
  try {
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
    await prisma.$disconnect()
  }
}
