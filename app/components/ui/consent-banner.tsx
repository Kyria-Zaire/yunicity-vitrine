'use client'

import { useEffect, useState } from 'react'
import { Button } from './button'
import { Card } from './card'

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hasConsent = document.cookie.split('; ').some((c) => c.startsWith('cookie_consent='))
    setVisible(!hasConsent)
  }, [])

  const accept = () => {
    document.cookie = `cookie_consent=accepted; path=/; max-age=${60 * 60 * 24 * 365}`
    setVisible(false)
    // Optionnel: recharger pour initialiser GA
    window.location.reload()
  }

  const reject = () => {
    document.cookie = `cookie_consent=rejected; path=/; max-age=${60 * 60 * 24 * 365}`
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <Card className="mx-auto max-w-3xl p-4 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-gray-700">
            Nous utilisons des cookies pour mesurer l'audience (Google Analytics) et améliorer votre expérience. Vous pouvez accepter ou refuser.
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={reject}>Refuser</Button>
            <Button onClick={accept}>Accepter</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}


