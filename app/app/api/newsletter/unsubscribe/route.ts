import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token') || ''
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 400 })
    }

    const subscriber = await prisma.newsletter.findFirst({ where: { unsubscribeToken: token } })
    if (!subscriber) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 400 })
    }

    if (subscriber.unsubscribedAt) {
      return NextResponse.json({ success: true, message: 'Déjà désinscrit' })
    }

    await prisma.newsletter.update({
      where: { id: subscriber.id },
      data: { unsubscribedAt: new Date() },
    })

    return NextResponse.json({ success: true, message: 'Vous êtes désinscrit.' })
  } catch (error) {
    console.error('Unsubscribe error', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}


