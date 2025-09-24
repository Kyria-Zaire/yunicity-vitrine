import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token') || ''
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 400 })
    }

    const subscriber = await prisma.newsletter.findFirst({
      where: { confirmationToken: token },
    })

    if (!subscriber) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 400 })
    }

    if (subscriber.confirmed) {
      return NextResponse.json({ success: true, message: 'Déjà confirmé' })
    }

    await prisma.newsletter.update({
      where: { id: subscriber.id },
      data: { confirmed: true, confirmedAt: new Date(), confirmationToken: null },
    })

    return NextResponse.json({ success: true, message: 'Inscription confirmée' })
  } catch (error) {
    console.error('Newsletter confirm error', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}


