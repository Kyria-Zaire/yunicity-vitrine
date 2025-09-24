
'use client'

import { motion } from 'framer-motion'
import { Heart, Linkedin, Facebook, Instagram, Mail, MapPin, Calendar, ExternalLink } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'

export default function Footer() {
  const socialLinks = [
    {
      icon: Linkedin,
      href: SITE_CONFIG.social.linkedin.url,
      label: 'LinkedIn',
      handle: SITE_CONFIG.social.linkedin.handle
    },
    {
      icon: Facebook,
      href: SITE_CONFIG.social.facebook.url,
      label: 'Facebook',
      handle: SITE_CONFIG.social.facebook.handle
    },
    {
      icon: Instagram,
      href: SITE_CONFIG.social.instagram.url,
      label: 'Instagram',
      handle: SITE_CONFIG.social.instagram.handle
    }
  ]

  const handleContactClick = () => {
    const subject = encodeURIComponent('Contact depuis le site Yunicity')
    const body = encodeURIComponent(`
Bonjour l'équipe Yunicity,

Je vous contacte depuis votre site web pour...

Cordialement,
    `.trim())
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${SITE_CONFIG.contact.email}&su=${subject}&body=${body}`
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  // Suppression de handleSocialClick - utilisation de liens HTML classiques

  const scrollToNewsletter = () => {
    const element = document.getElementById('newsletter')
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 border-b border-white/10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-3xl font-bold gradient-text mb-4 font-outfit">
                  Yunicity
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Faire battre le cœur de la ville. La plateforme qui connecte les communautés locales 
                  et révèle les trésors cachés de votre région.
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Ville pilote : {SITE_CONFIG.contact.city}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Lancement : {SITE_CONFIG.launchDateDisplay}</span>
              </div>
            </motion.div>

            {/* Contact Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-white font-outfit">
                Restons connectés
              </h4>
              
              <button
                onClick={handleContactClick}
                className="flex items-center gap-3 text-gray-300 hover:text-violet-300 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center group-hover:bg-violet-500/30 transition-colors duration-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Contactez-nous</div>
                  <div className="text-sm text-gray-400">{SITE_CONFIG.contact.email}</div>
                </div>
              </button>

              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  Une question ? Une suggestion ? N&apos;hésitez pas à nous contacter !
                </p>
                
                <motion.button
                  onClick={scrollToNewsletter}
                  className="inline-flex items-center gap-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Rejoindre la newsletter
                  <Mail className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Social Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-xl font-semibold text-white font-outfit">
                Suivez-nous
              </h4>
              
              <div className="space-y-4">
                <motion.button
                  onClick={() => {
                    const socialSection = document.querySelector('#social-section')
                    if (socialSection) {
                      socialSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="flex items-center gap-3 text-gray-300 hover:text-violet-300 transition-colors duration-300 group w-full text-left"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 bg-gray-700/50 hover:bg-violet-500/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Facebook className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-medium block">Facebook</span>
                    <span className="text-xs text-gray-500">Voir notre page</span>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => {
                    const socialSection = document.querySelector('#social-section')
                    if (socialSection) {
                      socialSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="flex items-center gap-3 text-gray-300 hover:text-violet-300 transition-colors duration-300 group w-full text-left"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 bg-gray-700/50 hover:bg-violet-500/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-medium block">Instagram</span>
                    <span className="text-xs text-gray-500">Voir notre profil</span>
                  </div>
                </motion.button>

                <motion.div
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={socialLinks.find(s => s.label === 'LinkedIn')?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-violet-300 transition-colors duration-300 group w-full"
                  >
                    <div className="w-10 h-10 bg-gray-700/50 hover:bg-violet-500/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-medium block">LinkedIn</span>
                      <span className="text-xs text-gray-500">@yunicity-app</span>
                    </div>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto" />
                  </a>
                </motion.div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-gray-300 mb-2 font-medium">
                  Bientôt disponible
                </p>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                    iOS
                  </div>
                  <div className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                    Android
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Yunicity. Fait avec{' '}
              <Heart className="inline h-4 w-4 text-red-500" /> à {SITE_CONFIG.contact.city.split(',')[0]} pour connecter les communautés.
            </p>
            
            <div className="flex items-center gap-6">
              <button
                onClick={scrollToNewsletter}
                className="text-gray-400 hover:text-violet-300 text-sm transition-colors duration-300"
              >
                Newsletter
              </button>
              <button
                onClick={handleContactClick}
                className="text-gray-400 hover:text-violet-300 text-sm transition-colors duration-300"
              >
                Contact
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
