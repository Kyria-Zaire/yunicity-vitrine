
'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, Rocket } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'

interface CountdownTimerProps {
  targetDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [mounted, setMounted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Calcul optimisé pour éviter les re-renders inutiles
  const targetTime = useMemo(() => new Date(targetDate).getTime(), [targetDate])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetTime - Date.now()
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    // Calcul initial immédiat
    const initialTime = calculateTimeLeft()
    setTimeLeft(initialTime)

    // Clear previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Only update every 10 seconds to reduce performance impact
    intervalRef.current = setInterval(() => {
      if (!document.hidden && document.hasFocus()) {
        const newTimeLeft = calculateTimeLeft()
        setTimeLeft(prevTime => {
          // Only update if there's a meaningful change (minutes or more)
          if (
            prevTime.days !== newTimeLeft.days ||
            prevTime.hours !== newTimeLeft.hours ||
            prevTime.minutes !== newTimeLeft.minutes
          ) {
            return newTimeLeft
          }
          return prevTime
        })
      }
    }, 10000) // Update every 10 seconds instead of every second

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [targetTime, mounted])

  // Loading state simple
  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Lancement prévu
          </h2>
          <p className="text-xl text-white/80">
            Préparez-vous à rejoindre notre communauté
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <div className="animate-pulse">
            <div className="flex items-center justify-center mb-8">
              <div className="h-8 bg-white/20 rounded w-64"></div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-20 bg-white/20 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-white/20 rounded w-16 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const timeUnits = [
    { label: 'Jours', value: timeLeft.days },
    { label: 'Heures', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes }
  ]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Rocket className="w-8 h-8 text-yellow-400" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Lancement prévu
          </h2>
          <Rocket className="w-8 h-8 text-yellow-400" />
        </div>
        
        <p className="text-xl text-white/80 mb-4">
          Rejoignez des milliers d'utilisateurs qui attendent le lancement
        </p>
        
        <div className="flex items-center justify-center gap-2 text-white/60">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">{SITE_CONFIG.launchDateDisplay}</span>
        </div>
      </motion.div>

      {/* Timeline Style Countdown */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Main Container */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          
          {/* Timeline Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full"></div>
            <div className="text-white/80 font-semibold text-lg tracking-wide">
              CHRONOLOGIE DU LANCEMENT
            </div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full"></div>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-400 via-violet-400 to-purple-400 rounded-full opacity-30"></div>
            
            {/* Timeline Items */}
            <div className="grid grid-cols-3 gap-6 md:gap-8">
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {/* Timeline Node */}
                  <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div 
                      className="w-4 h-4 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full shadow-lg"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          '0 0 10px rgba(139, 92, 246, 0.5)',
                          '0 0 20px rgba(139, 92, 246, 0.8)',
                          '0 0 10px rgba(139, 92, 246, 0.5)'
                        ]
                      }}
                      transition={{ 
                        duration: unit.label === 'Secondes' ? 1 : 2, 
                        repeat: Infinity 
                      }}
                    />
                  </div>

                  {/* Time Card */}
                  <motion.div
                    className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Value */}
                    <motion.div
                      className="text-4xl md:text-5xl font-black text-white mb-3 group-hover:text-purple-200 transition-colors"
                      key={unit.value}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.5,
                        type: "spring",
                        stiffness: 150
                      }}
                    >
                      {String(unit.value).padStart(2, '0')}
                    </motion.div>

                    {/* Label */}
                    <div className="text-white/70 font-medium text-sm uppercase tracking-wider">
                      {unit.label}
                    </div>
                    
                    {/* Subtle Animation Indicator */}
                    <motion.div
                      className="w-full h-1 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: unit.label === 'Secondes' ? [0, 1, 0] : 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Timeline Label */}
                  <div className="hidden md:block text-center mt-4">
                    <div className="text-white/50 text-xs font-medium">
                      {index === 0 && 'Début'}
                      {index === 1 && 'Progression'}
                      {index === 2 && 'Approche'}
                      {index === 3 && 'Lancement'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <motion.div 
            className="text-center mt-12 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Pré-inscriptions ouvertes</span>
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="flex items-center gap-2 text-orange-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Accès anticipé disponible</span>
              </div>
            </div>
            
            <p className="text-white/60 text-sm">
              Soyez parmi les premiers à découvrir YuniCity
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
