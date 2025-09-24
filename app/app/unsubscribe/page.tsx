'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'

function UnsubscribePageContent() {
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
        const json = await res.json()

        if (json.success) {
          setStatus('success')
          setMessage(json.message || 'Vous êtes désinscrit avec succès')
        } else {
          setStatus('error')
          setMessage(json.error || 'Erreur de désinscription')
        }
      } catch (error) {
        setStatus('error')
        setMessage('Erreur de réseau')
      }
    }

    run()
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {status === 'loading' && (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-6"></div>
        )}

        {status === 'success' && (
          <Check className="w-16 h-16 text-green-500 mx-auto mb-6" />
        )}

        {status === 'error' && (
          <X className="w-16 h-16 text-red-500 mx-auto mb-6" />
        )}

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {status === 'loading' && 'Désinscription en cours...'}
          {status === 'success' && 'Désinscription réussie'}
          {status === 'error' && 'Erreur de désinscription'}
        </h1>

        <p className="text-gray-600 mb-8">
          {status === 'idle' && 'Initialisation...'}
          {status === 'loading' && 'Nous traitons votre demande...'}
          {message}
        </p>

        {status === 'success' && (
          <p className="text-sm text-gray-500 mb-6">
            Vous ne recevrez plus nos emails. Nous espérons vous revoir bientôt !
          </p>
        )}

        <div className="space-y-3">
          <Button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-6 py-3 rounded-full font-medium"
          >
            Retour à l&apos;accueil
          </Button>

          {status === 'success' && (
            <Button
              variant="outline"
              onClick={() => window.location.href = '/#newsletter'}
              className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-full font-medium"
            >
              Se réinscrire
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    }>
      <UnsubscribePageContent />
    </Suspense>
  )
}