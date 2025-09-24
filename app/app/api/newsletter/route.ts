
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendWelcomeNewsletter } from '@/lib/sendgrid'

export const dynamic = "force-dynamic"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request?.json()
    const { email, name, company, message } = body || {}

    // Validation
    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'L\'email est requis' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email?.trim())) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSubscriber = await prisma?.newsletter?.findUnique({
      where: { email: email?.trim()?.toLowerCase() }
    })

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Cet email est déjà inscrit à notre newsletter' },
        { status: 409 }
      )
    }

    // Create new subscriber
    const subscriber = await prisma?.newsletter?.create({
      data: {
        email: email?.trim()?.toLowerCase(),
        name: name?.trim() || null,
        company: company?.trim() || null,
        message: message?.trim() || null,
      }
    })

    // Send welcome email (non-blocking)
    try {
      await sendWelcomeNewsletter({
        email: subscriber.email,
        name: subscriber.name || undefined,
        company: subscriber.company || undefined
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
    await prisma?.$disconnect()
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
    await prisma?.$disconnect()
  }
}
