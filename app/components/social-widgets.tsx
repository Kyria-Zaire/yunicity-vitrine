
'use client'

import { useEffect } from 'react'

interface FacebookPagePluginProps {
  pageUrl: string
  width?: number
  height?: number
  showFeed?: boolean
}

interface InstagramEmbedProps {
  postUrl?: string
  width?: number
  height?: number
}

export function FacebookPagePlugin({ 
  pageUrl, 
  width = 340, 
  height = 500, 
  showFeed = true 
}: FacebookPagePluginProps) {
  useEffect(() => {
    // Charger le SDK Facebook
    if (typeof window !== 'undefined' && !window.FB) {
      window.fbAsyncInit = function() {
        window.FB.init({
          xfbml: true,
          version: 'v18.0'
        })
      }

      // Charger le script Facebook SDK
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      script.src = 'https://connect.facebook.net/fr_FR/sdk.js'
      document.head.appendChild(script)
    } else if (window.FB) {
      // Si FB est déjà chargé, parser les nouveaux éléments
      window.FB.XFBML.parse()
    }
  }, [])

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <h3 className="text-white font-semibold text-lg">Suivez-nous sur Facebook</h3>
      </div>
      <div className="p-4">
        <div 
          className="fb-page" 
          data-href={pageUrl}
          data-tabs={showFeed ? "timeline" : ""}
          data-width={width}
          data-height={height - 100}
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
            <a href={pageUrl} className="text-blue-600 hover:text-blue-800">
              Visitez notre page Facebook
            </a>
          </blockquote>
        </div>
      </div>
    </div>
  )
}

export function InstagramEmbed({ postUrl, width = 340, height = 500 }: InstagramEmbedProps) {
  useEffect(() => {
    // Charger le script Instagram Embed
    if (typeof window !== 'undefined' && !window.instgrm) {
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.src = '//www.instagram.com/embed.js'
      document.body.appendChild(script)
    } else if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
  }, [])

  // Si pas d'URL de post spécifique, afficher un widget de profil Instagram basique
  if (!postUrl) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 bg-gradient-to-r from-pink-600 to-purple-600">
          <h3 className="text-white font-semibold text-lg">Suivez-nous sur Instagram</h3>
        </div>
        <div className="p-6 text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <p className="text-gray-600 mb-4">@yunicity.app</p>
          <a 
            href="https://www.instagram.com/yunicity.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
          >
            Suivre sur Instagram
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="p-4 bg-gradient-to-r from-pink-600 to-purple-600">
        <h3 className="text-white font-semibold text-lg">Instagram</h3>
      </div>
      <div className="p-4">
        <blockquote 
          className="instagram-media" 
          data-instgrm-permalink={postUrl}
          data-instgrm-version="14"
          style={{ 
            background: '#FFF',
            border: '0',
            borderRadius: '3px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px',
            maxWidth: '540px',
            minWidth: '326px',
            padding: '0',
            width: '99.375%'
          }}
        >
          <div style={{ padding: '16px' }}>
            <a href={postUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              Voir ce post sur Instagram
            </a>
          </div>
        </blockquote>
      </div>
    </div>
  )
}

// Déclarations TypeScript pour les APIs externes
declare global {
  interface Window {
    FB: any
    fbAsyncInit: () => void
    instgrm: any
  }
}
