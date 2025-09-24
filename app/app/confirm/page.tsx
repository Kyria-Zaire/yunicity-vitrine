'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ConfirmPageContent() {
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
        const res = await fetch(`/api/newsletter/confirm?token=${encodeURIComponent(token)}`)
        const json = await res.json()

        if (json.success) {
          setStatus('success')
          setMessage(json.message || 'Inscription confirmée avec succès !')
        } else {
          setStatus('error')
          setMessage(json.error || 'Erreur de confirmation')
        }
      } catch (error) {
        setStatus('error')
        setMessage('Erreur de réseau')
      }
    }

    run()
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {status === 'loading' && (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-6"></div>
        )}

        {status === 'success' && (
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        )}

        {status === 'error' && (
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        )}

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {status === 'loading' && 'Confirmation en cours...'}
          {status === 'success' && 'Confirmation réussie !'}
          {status === 'error' && 'Erreur de confirmation'}
        </h1>

        <p className="text-gray-600 mb-8">
          {status === 'idle' && 'Initialisation...'}
          {status === 'loading' && 'Nous vérifions votre inscription...'}
          {message}
        </p>

        {status === 'success' && (
          <p className="text-sm text-gray-500 mb-6">
            Merci de rejoindre la communauté Yunicity ! Nous vous tiendrons informé de nos actualités et de notre lancement officiel. Yunicity, c&apos;est bientôt !
          </p>
        )}

        <Button
          onClick={() => window.location.href = '/'}
          className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-6 py-3 rounded-full font-medium"
        >
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    }>
      <ConfirmPageContent />
    </Suspense>
  )
}