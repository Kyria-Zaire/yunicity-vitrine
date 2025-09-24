
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Respecter le consentement cookies avant tout tracking
    const hasConsent = typeof document !== 'undefined' && document.cookie.split('; ').includes('cookie_consent=accepted')
    if (!hasConsent) return

    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
        page_path: pathname,
      })
    }
  }, [pathname])

  // Ne rien rendre si pas d'ID ou si consentement absent
  const hasConsent = typeof document !== 'undefined' && document.cookie.split('; ').includes('cookie_consent=accepted')
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || !hasConsent) {
    return null
  }

  return (
    <>
      {/* Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
            
            // Enhanced ecommerce tracking for startup metrics
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              custom_map: {
                'custom_parameter_1': 'newsletter_signup',
                'custom_parameter_2': 'investor_contact',
                'custom_parameter_3': 'early_access_interest'
              }
            });
          `,
        }}
      />
    </>
  )
}

// Analytics tracking functions for key events
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      event_category: 'yunicity_engagement',
    })
  }
}

// Specific tracking functions for investor presentation
export const trackNewsletterSignup = (email: string, userType: string = 'general') => {
  trackEvent('newsletter_signup', {
    user_type: userType,
    engagement_level: 'high',
    conversion_value: 1
  })
}

export const trackInvestorContact = (investorType: string, investmentRange: string) => {
  trackEvent('investor_contact', {
    investor_type: investorType,
    investment_range: investmentRange,
    conversion_value: 100, // High value event for investors
    engagement_level: 'critical'
  })
}

export const trackCountdownView = () => {
  trackEvent('countdown_view', {
    engagement_level: 'medium',
    section: 'hero'
  })
}

export const trackEarlyAccessClick = () => {
  trackEvent('early_access_click', {
    engagement_level: 'high',
    conversion_intent: 'strong'
  })
}
