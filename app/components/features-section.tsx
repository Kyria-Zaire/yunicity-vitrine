
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Map, 
  Filter, 
  MapPin, 
  Users, 
  Award, 
  CreditCard, 
  Newspaper,
  MessageSquare 
} from 'lucide-react'
import Image from 'next/image'

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const scrollToNewsletter = () => {
    const element = document.getElementById('newsletter')
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }
  }

  const features = [
    {
      icon: Map,
      title: 'Carte 3D Interactive',
      description: 'Explorez votre ville en 3D avec tous les points d\'intérêt, événements et lieux incontournables.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Filter,
      title: 'Filtres Personnalisés',
      description: 'Culture, loisirs, gastronomie... Filtrez selon vos passions pour une expérience sur-mesure.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: MapPin,
      title: 'Géolocalisation & Suggestions',
      description: 'Recevez des recommandations intelligentes basées sur votre position et vos préférences.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Tribus Locales',
      description: 'Rejoignez des groupes de discussion thématiques et connectez-vous avec vos voisins.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Award,
      title: 'Ambassadeurs Certifiés',
      description: 'Suivez les recommandations d\'experts locaux certifiés pour découvrir les meilleurs spots.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: CreditCard,
      title: 'Passeport Yunicity',
      description: 'Collectionnez des points et bénéficiez de réductions exclusives chez vos commerçants locaux.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Newspaper,
      title: 'Hub d\'Informations',
      description: 'Centralisez toutes les actualités, événements et bons plans de votre territoire.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: MessageSquare,
      title: 'Place Communautaire',
      description: 'Échangez sur le mur communautaire et participez à la vie locale de votre quartier.',
      color: 'from-teal-500 to-green-500'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl -translate-x-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 px-4 py-2 rounded-full mb-6 font-medium backdrop-blur-sm border border-violet-500/20">
            <Map className="h-4 w-4" />
            Fonctionnalités V1
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-outfit">
            L&apos;application qui va <span className="gradient-text">révolutionner</span> votre{' '}
            <span className="gradient-text">quotidien local</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez les fonctionnalités innovantes qui feront de Yunicity votre compagnon indispensable 
            pour explorer et vivre votre territoire.
          </p>
        </motion.div>

        {/* Hero Feature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full font-medium">
                <Map className="h-4 w-4" />
                Fonctionnalité phare
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white font-outfit">
                Carte 3D Interactive Révolutionnaire
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Naviguez dans votre ville comme jamais auparavant avec notre carte 3D immersive. 
                Découvrez les événements, commerces et lieux d&apos;intérêt en temps réel avec une 
                expérience visuelle époustouflante.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Vue 3D', 'Temps réel', 'Géolocalisation', 'Réalité augmentée'].map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://cdn.abacus.ai/images/5187dacc-e791-4e5e-851e-41a99aa62bb8.png"
                  alt="Interface mobile Yunicity avec carte 3D interactive"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              </div>
              
              {/* Floating UI Elements */}
              <motion.div
                className="absolute -top-6 -right-6 glass-card p-4 backdrop-blur-md bg-white/10 border border-white/20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-white font-bold">Live</div>
                <div className="text-blue-300 text-sm">3 événements</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 glass-card p-3 backdrop-blur-md bg-white/10 border border-white/20"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-green-300 text-sm font-semibold">AR Ready</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 font-outfit group-hover:text-violet-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-20"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6 font-outfit">
              Et ce n&apos;est que le début...
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              D&apos;autres fonctionnalités révolutionnaires sont en préparation pour faire de Yunicity 
              la plateforme de référence de la vie locale en France.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="gradient-bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToNewsletter}
              >
                Être notifié du lancement
              </motion.button>
              <motion.button
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToNewsletter}
              >
                En savoir plus
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
