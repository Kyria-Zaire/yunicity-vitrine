'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: any) => void
      reset: (widgetId?: string) => void
      getResponse: (widgetId?: string) => string
    }
  }
}

type Props = {
  siteKey?: string
  onToken: (token: string) => void
}

export function Turnstile({ siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY, onToken }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const key = siteKey
    if (!key) return

    const render = () => {
      if (window.turnstile && el) {
        window.turnstile.render(el, {
          sitekey: key,
          theme: 'light',
          callback: (token: string) => onToken(token),
        })
      }
    }

    if (typeof window !== 'undefined') {
      if (window.turnstile) render()
      else {
        const i = setInterval(() => {
          if (window.turnstile) {
            clearInterval(i)
            render()
          }
        }, 100)
        return () => clearInterval(i)
      }
    }
  }, [siteKey, onToken])

  if (!siteKey) return null
  return <div ref={ref} className="cf-turnstile" />
}


