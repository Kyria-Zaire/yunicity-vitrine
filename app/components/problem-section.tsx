
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AlertTriangle, Users, MapPin, MessageSquareOff } from 'lucide-react'
import Image from 'next/image'

export default function ProblemSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const problems = [
    {
      icon: Users,
      stat: '34 millions',
      title: 'Français non engagés',
      description: 'Plus de 50% des Français ne participent pas à la vie locale de leur communauté'
    },
    {
      icon: MessageSquareOff,
      stat: 'Manque de',
      title: 'Communication locale',
      description: 'Les habitants ne communiquent pas entre eux et ignorent les événements locaux'
    },
    {
      icon: MapPin,
      stat: 'Information',
      title: 'Éparpillée partout',
      description: 'L\'information locale est dispersée sur de multiples plateformes et canaux'
    },
    {
      icon: AlertTriangle,
      stat: 'Faible sentiment',
      title: 'D\'appartenance',
      description: 'Les communautés perdent leur cohésion et leur identité locale'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='https://previews.123rf.com/images/mainfu/mainfu1807/mainfu180701781/105236455-black-circle-consisting-of-small-circles.jpg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6 font-medium">
            <AlertTriangle className="h-4 w-4" />
            Problématique actuelle
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-outfit">
            Une France <span className="gradient-text">déconnectée</span> de ses{' '}
            <span className="gradient-text">communautés</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Malgré l&apos;hyperconnexion numérique, nous n&apos;avons jamais été aussi éloignés de nos voisins 
            et des richesses de nos territoires.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://cdn.abacus.ai/images/8a4ce0c9-ccec-479d-bc90-4e3498299ab3.png"
                alt="Communauté déconnectée"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <motion.div
              className="absolute -top-8 -right-8 glass-card p-6 backdrop-blur-md bg-white/80"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-2xl font-bold text-red-500 mb-1">50%</div>
              <div className="text-sm text-gray-600 font-medium">Non engagés</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 glass-card p-4 backdrop-blur-md bg-white/80"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-lg font-bold text-orange-500 mb-1">Isolement</div>
              <div className="text-xs text-gray-600">Croissant</div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            {problems?.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                    <problem.icon className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-red-600 mb-1 uppercase tracking-wide">
                    {problem?.stat}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {problem?.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {problem?.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-l-4 border-red-500"
            >
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="font-semibold text-red-700">Constat alarmant</span>
              </div>
              <p className="text-red-700 leading-relaxed">
                Cette déconnexion affaiblit le tissu social local, limite l&apos;épanouissement personnel 
                et freine le développement économique des territoires.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
