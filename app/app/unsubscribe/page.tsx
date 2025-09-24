'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'

export default function UnsubscribePage() {
  const search = useSearchParams()
  const token = search.get('token') || ''
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setStatus('error')
        setMessage('Lien invalide : token manquant.')
        return
      }
      setStatus('loading')
      try {
        const res = await fetch(`/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`)
        const data = await res.json()
        if (res.ok) {
          setStatus('success')
          setMessage(data.message || 'Vous êtes désinscrit.')
        } else {
          setStatus('error')
          setMessage(data.error || 'Une erreur est survenue.')
        }
      } catch (e) {
        setStatus('error')
        setMessage('Erreur réseau. Réessayez plus tard.')
      }
    }
    run()
  }, [token])

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow p-8 text-center">
        {status === 'loading' && <div className="animate-pulse text-gray-600">Traitement en cours…</div>}
        {status === 'success' && (
          <>
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Désinscription confirmée</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Button onClick={() => (window.location.href = '/')}>Retour à l’accueil</Button>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <X className="text-red-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Oups, lien invalide</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Button variant="outline" onClick={() => (window.location.href = '/')}>Retour à l’accueil</Button>
          </>
        )}
      </div>
    </main>
  )
}


