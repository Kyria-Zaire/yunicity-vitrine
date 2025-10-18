
'use client'

import { Star, MessageCircle, Heart, Sparkles, TrendingUp, Users, Calendar } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import CountdownTimer from './countdown-timer'
import { SITE_CONFIG } from '@/lib/config'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, staggerItem } from '@/lib/motion-config'
import { useEffect, useState } from 'react'

// Composant Stats Section avec animations
function StatsSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const stats = [
    {
      value: '290K+',
      label: 'Habitants dans le Grand Reims',
      sublabel: 'Notre marché cible initial',
      icon: Users,
      gradient: 'from-purple-500 to-violet-600',
    },
    {
      value: '50+',
      label: 'Commerces partenaires potentiels',
      sublabel: 'Identifiés pour le lancement',
      icon: TrendingUp,
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      value: 'Dec 2025',
      label: 'Lancement officiel',
      sublabel: 'Phase MVP prête',
      icon: Calendar,
      gradient: 'from-orange-500 to-pink-600',
    },
  ]

  return (
    <div className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section pour investisseurs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Marché & Opportunités
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Le potentiel de Yunicity à Reims et sa région
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient animé au hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Icône */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: 'spring' }}
                className={`w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} p-3 text-white shadow-lg`}
              >
                <stat.icon className="w-full h-full" />
              </motion.div>

              {/* Valeur avec compteur animé */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-3"
              >
                {stat.value}
              </motion.div>

              <p className="text-gray-800 font-bold mb-2 text-lg">{stat.label}</p>
              <p className="text-sm text-gray-600">{stat.sublabel}</p>

              {/* Effet de brillance au hover */}
              <motion.div
                className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-full blur-3xl"
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Composant Value Proposition avec animations
function ValuePropositionSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const values = [
    {
      icon: Star,
      title: 'Modèle Freemium',
      description: 'Monétisation via abonnements premium et partenariats avec les commerces locaux de Reims',
      gradient: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      icon: MessageCircle,
      title: 'Tech Stack Moderne',
      description: 'Plateforme scalable développée avec Next.js, prête pour expansion nationale après validation à Reims',
      gradient: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      icon: Heart,
      title: 'Marché Porteur',
      description: 'Commerce local et communautés urbaines : un secteur en croissance de 15% par an',
      gradient: 'from-purple-400 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
    },
  ]

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Proposition de Valeur
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Une solution innovante pour connecter les communautés locales de Reims
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative text-center p-10 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              {/* Background gradient animé */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Cercles décoratifs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

              {/* Contenu */}
              <div className="relative z-10">
                {/* Icône avec animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2 + 0.3,
                    type: 'spring',
                  }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300`}
                >
                  <value.icon className="w-12 h-12 text-white" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300"
                >
                  {value.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                  className="text-gray-600 leading-relaxed text-base"
                >
                  {value.description}
                </motion.p>
              </div>

              {/* Bordure animée au hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-300 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const { scrollY } = useScroll()
  const [mounted, setMounted] = useState(false)

  // Effet parallax sur l'image de fond
  const imageY = useTransform(scrollY, [0, 500], [0, 150])
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.7, 0.9])

  const scrollToNewsletter = () => {
    const element = document.getElementById('newsletter')
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-violet-50 overflow-hidden">
        {/* Main Hero Content */}
        <div className="relative">
          {/* Background Image with Parallax */}
          <div className="relative h-[600px] md:h-[700px] overflow-hidden">
            <motion.div
              style={{ y: mounted ? imageY : 0 }}
              className="absolute inset-0 scale-110"
            >
              <Image
                src="https://cdn.abacus.ai/images/18d18585-f092-470e-8562-bfe7de047280.png"
                alt="Vue de la ville avec des gens qui marchent - Communauté urbaine connectée"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>

            {/* Gradient Overlay animé */}
            <motion.div
              style={{ opacity: mounted ? overlayOpacity : 0.7 }}
              className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-violet-800/60 to-purple-900/70"
            />

            {/* Pattern overlay */}
            <div className="absolute inset-0 hero-pattern opacity-10" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
              {/* Badge de lancement avec animation */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/90 to-violet-600/90 backdrop-blur-md rounded-full px-6 py-3 shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  <span className="text-white font-semibold text-sm md:text-base">
                    Lancement prévu : {SITE_CONFIG.launchDateDisplay}
                  </span>
                </div>
              </motion.div>

              {/* Main Heading avec animation stagger */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="max-w-4xl mx-auto mb-8"
              >
                <motion.h1
                  variants={staggerItem}
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-tight"
                >
                  Votre communauté
                  <br />
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 animate-gradient">
                      vous attend
                    </span>
                    {/* Effet de brillance */}
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                        repeatDelay: 5
                      }}
                    />
                  </span>
                </motion.h1>
                <motion.p
                  variants={staggerItem}
                  className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
                >
                  Rejoignez des milliers de personnes qui partagent vos passions.
                  Connectez-vous, découvrez et vivez des expériences uniques.
                </motion.p>
              </motion.div>

              {/* CTA Buttons avec animations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="relative group bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden"
                    onClick={scrollToNewsletter}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Rejoindre maintenant
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </span>
                    {/* Effet de brillance au hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/90 hover:bg-white text-purple-700 border-2 border-white/50 hover:border-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl backdrop-blur-sm transition-all duration-300"
                  >
                    En savoir plus
                  </Button>
                </motion.div>
              </motion.div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section - Orienté investisseurs */}
          <StatsSection />

          {/* Features Section */}
          <ValuePropositionSection />

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
