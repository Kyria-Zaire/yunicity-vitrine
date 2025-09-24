
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/config'
import GoogleAnalytics from '@/components/google-analytics'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata = {
  title: SITE_CONFIG.meta.title,
  description: SITE_CONFIG.meta.description,
  keywords: SITE_CONFIG.meta.keywords,
  authors: [{ name: 'Yunicity' }],
  openGraph: {
    title: SITE_CONFIG.meta.title,
    description: SITE_CONFIG.meta.description,
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Yunicity'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.meta.title,
    description: SITE_CONFIG.meta.description,
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://yunicity.com',
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6366f1'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={cn(inter.variable, outfit.variable)} suppressHydrationWarning>
      <head>
        {/* Préchargement des fonts pour améliorer les performances */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Meta tags pour les performances */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Yunicity",
              "description": SITE_CONFIG.meta.description,
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://yunicity.com',
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yunicity.com"}/logo.png`,
              "sameAs": [
                SITE_CONFIG.social.linkedin.url,
                SITE_CONFIG.social.facebook.url,
                SITE_CONFIG.social.instagram.url
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": SITE_CONFIG.contact.city
              }
            })
          }}
        />
      </head>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.className
      )} suppressHydrationWarning>
        <GoogleAnalytics />
        <div id="root">
          {children}
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
