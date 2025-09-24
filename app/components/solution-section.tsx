
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Heart, MapPin, Users, Zap, Target } from 'lucide-react'
import Image from 'next/image'

export default function SolutionSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const solutions = [
    {
      icon: MapPin,
      title: 'Centralisation intelligente',
      description: 'Toute l\'information locale en un seul endroit, organisée et accessible'
    },
    {
      icon: Target,
      title: 'Personnalisation poussée',
      description: 'Contenu adapté selon vos centres d\'intérêt et votre profil'
    },
    {
      icon: Zap,
      title: 'Temps réel',
      description: 'Accès instantané aux événements, bons plans et actualités locales'
    },
    {
      icon: Users,
      title: 'Reconnexion sociale',
      description: 'Facilitez les rencontres et échanges avec vos voisins'
    },
    {
      icon: Heart,
      title: 'Valorisation locale',
      description: 'Donnez de la visibilité aux acteurs et trésors de votre territoire'
    },
    {
      icon: CheckCircle,
      title: 'Engagement récompensé',
      description: 'Système de points et avantages pour les habitants actifs'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-violet-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6 font-medium">
            <CheckCircle className="h-4 w-4" />
            Notre solution
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-outfit">
            Yunicity <span className="gradient-text">reconnecte</span> les{' '}
            <span className="gradient-text">communautés</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Une plateforme innovante qui révèle les trésors cachés de votre région et crée du lien social 
            authentique entre les habitants.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-900 font-outfit">
                Comment Yunicity transforme votre quotidien
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Fini l&apos;isolement et les occasions manquées. Yunicity vous connecte instantanément 
                à tout ce qui se passe autour de vous.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {solutions?.slice(0, 4)?.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center group-hover:bg-violet-200 transition-colors duration-300">
                      <solution.icon className="h-5 w-5 text-violet-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">
                      {solution?.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {solution?.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://cdn.abacus.ai/images/b6dcea71-bfd2-4a52-9626-12539f1ef510.png"
                alt="Technologie Yunicity"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/30 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-6 -left-6 glass-card p-4 backdrop-blur-md bg-white/90"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-lg font-bold gradient-text mb-1">Smart</div>
              <div className="text-xs text-gray-600">Découverte</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 glass-card p-4 backdrop-blur-md bg-white/90"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="text-lg font-bold gradient-text mb-1">Local</div>
              <div className="text-xs text-gray-600">Connect</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {solutions?.slice(4)?.map((solution, index) => (
            <motion.div
              key={index + 4}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/40 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <solution.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 font-outfit">
                    {solution?.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {solution?.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4 font-outfit">
              Prêt à redécouvrir votre ville ?
            </h3>
            <p className="text-violet-100 mb-6 max-w-md">
              Rejoignez la révolution du lien local et ne manquez plus jamais ce qui se passe près de chez vous.
            </p>
            <motion.button
              className="bg-white text-violet-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document?.getElementById('newsletter')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
            >
              Rejoindre la communauté
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
