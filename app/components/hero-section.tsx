
'use client'

import { Star, MessageCircle, Heart } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import CountdownTimer from './countdown-timer'
import { SITE_CONFIG } from '@/lib/config'

export default function HeroSection() {
  
  const scrollToNewsletter = () => {
    const element = document.getElementById('newsletter')
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }
  }

  // Pas d'animation pour les pré-inscriptions - données réelles

  return (
    <div className="bg-white min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-violet-50">
        {/* Main Hero Content */}
        <div className="relative">
          {/* Background Image with Overlay */}
          <div className="relative h-[500px] overflow-hidden">
            <Image
              src="https://cdn.abacus.ai/images/18d18585-f092-470e-8562-bfe7de047280.png"
              alt="Vue de la ville avec des gens qui marchent - Communauté urbaine connectée"
              fill
              priority
              className="object-cover"
            />
            
            {/* Purple overlay to match reference design */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-violet-800/60 to-purple-900/70" />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              {/* Badge de lancement simplifié */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/90 to-violet-600/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">
                    Lancement prévu : {SITE_CONFIG.launchDateDisplay}
                  </span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                  Votre communauté
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400">
                    vous attend
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
                  Rejoignez des milliers de personnes qui partagent vos passions. 
                  Connectez-vous, découvrez et vivez des expériences uniques.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={scrollToNewsletter}
                >
                  Rejoindre maintenant
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-white/90 hover:bg-white text-purple-700 border-2 border-white/50 px-8 py-4 text-lg font-semibold rounded-full shadow-xl backdrop-blur-sm transition-all duration-300"
                >
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section - Orienté investisseurs */}
          <div className="bg-white py-16 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Titre de section pour investisseurs */}
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Marché & Opportunités
                </h2>
                <p className="text-lg text-gray-600">
                  Le potentiel de Yunicity à Reims et sa région
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl">
                  <div className="text-4xl md:text-5xl font-black text-purple-600 mb-2">
                    290K+
                  </div>
                  <p className="text-gray-700 font-semibold mb-2">Habitants dans le Grand Reims</p>
                  <p className="text-sm text-gray-500">Notre marché cible initial</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl">
                  <div className="text-4xl md:text-5xl font-black text-purple-600 mb-2">
                    50+
                  </div>
                  <p className="text-gray-700 font-semibold mb-2">Commerces partenaires potentiels</p>
                  <p className="text-sm text-gray-500">Identifiés pour le lancement</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl">
                  <div className="text-4xl md:text-5xl font-black text-purple-600 mb-2">
                    Dec 2025
                  </div>
                  <p className="text-gray-700 font-semibold mb-2">Lancement officiel</p>
                  <p className="text-sm text-gray-500">Phase MVP prête</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-gradient-to-b from-white to-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Proposition de Valeur
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Une solution innovante pour connecter les communautés locales de Reims
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {/* Modèle économique */}
                <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Star className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Modèle Freemium</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Monétisation via abonnements premium et partenariats avec les commerces locaux de Reims
                  </p>
                </div>
                
                {/* Technologie */}
                <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Tech Stack Moderne</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Plateforme scalable développée avec Next.js, prête pour expansion nationale après validation à Reims
                  </p>
                </div>
                
                {/* Marché */}
                <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Marché Porteur</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Commerce local et communautés urbaines : un secteur en croissance de 15% par an
                  </p>
                </div>
              </div>


            </div>
          </div>

          {/* Countdown Timer Section */}
          <div className="bg-gradient-to-br from-purple-900 via-violet-900 to-purple-800 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CountdownTimer targetDate={SITE_CONFIG.launchDate} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
