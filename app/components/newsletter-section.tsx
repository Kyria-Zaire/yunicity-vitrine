
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, User, Building, MessageSquare, Send, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { trackNewsletterSignup } from '@/components/google-analytics'
import { SITE_CONFIG } from '@/lib/config'
import { Turnstile } from '@/components/ui/turnstile'

export default function NewsletterSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [cfToken, setCfToken] = useState('')
  const hasTurnstile = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target || {}
    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value || ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email?.trim()) {
      setError('L\'email est requis')
      return
    }

    // Validation email côté client
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setError('Format d\'email invalide')
      return
    }

    if (hasTurnstile && !cfToken) {
      setError('Veuillez compléter la vérification anti-bot')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, cfToken: hasTurnstile ? cfToken : undefined }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        
        // Track newsletter signup for analytics
        trackNewsletterSignup(formData.email, formData.company ? 'business' : 'individual')
        
        // Ouvrir Gmail Compose avec les données structurées
        const subject = encodeURIComponent('Nouvelle inscription newsletter Yunicity')
        const body = encodeURIComponent(`
Nouvelle inscription sur le site Yunicity :

Nom: ${formData.name || 'Non renseigné'}
Email: ${formData.email}
Entreprise: ${formData.company || 'Non renseignée'}
Message: ${formData.message || 'Aucun message'}

Date: ${new Date().toLocaleString('fr-FR')}
        `.trim())
        
        const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${SITE_CONFIG.contact.email}&su=${subject}&body=${body}`
        window.open(gmailUrl, '_blank', 'noopener,noreferrer')
        
        // Reset form après succès
        setFormData({
          email: '',
          name: '',
          company: '',
          message: ''
        })
      } else {
        throw new Error(result.error || 'Erreur lors de l\'inscription')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      console.error('Newsletter submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="newsletter" className="section-padding bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-outfit">
              Merci de votre confiance !
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Votre inscription a été enregistrée avec succès. Vous serez parmi les premiers à découvrir 
              Yunicity lors du lancement officiel le <strong>{SITE_CONFIG.launchDateDisplay}</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                Nouvelle inscription
              </Button>
              <Button
                onClick={() => {
                  const subject = encodeURIComponent('Contact depuis le site Yunicity')
                  const body = encodeURIComponent(`Bonjour l'équipe Yunicity,\n\nJe viens de m'inscrire à votre newsletter et j'aimerais...`)
                  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${SITE_CONFIG.contact.email}&su=${subject}&body=${body}`
                  window.open(gmailUrl, '_blank', 'noopener,noreferrer')
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Nous contacter
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="newsletter" className="section-padding bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full mb-6 font-medium">
              <Mail className="h-4 w-4" />
              Rejoignez l&apos;aventure
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-outfit">
              Soyez parmi les <span className="gradient-text">premiers</span> à découvrir{' '}
              <span className="gradient-text">Yunicity</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Inscrivez-vous à notre newsletter et recevez des mises à jour exclusives sur le développement 
              de l&apos;application. Lancement prévu le <strong>{SITE_CONFIG.launchDateDisplay}</strong> !
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/40 p-8 md:p-12 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-violet-600" />
                    Email *
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre.email@exemple.com"
                      className="pl-12 h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      disabled={isSubmitting}
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4 text-violet-600" />
                    Nom complet
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jean Dupont"
                      className="pl-12 h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      disabled={isSubmitting}
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Company Field */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Building className="h-4 w-4 text-violet-600" />
                  Entreprise / Organisation
                </Label>
                <div className="relative">
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nom de votre entreprise"
                    className="pl-12 h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                    disabled={isSubmitting}
                  />
                  <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-violet-600" />
                  Message (optionnel)
                </Label>
                <div className="relative">
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Partagez-nous vos attentes ou vos questions sur Yunicity..."
                    className="pl-12 pt-4 min-h-[120px] border-gray-200 focus:border-violet-500 focus:ring-violet-500 resize-none"
                    disabled={isSubmitting}
                  />
                  <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div 
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col items-center space-y-4">
                {hasTurnstile && (
                  <div className="w-full md:w-auto">
                    <Turnstile onToken={setCfToken} />
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto gradient-bg-primary hover:shadow-lg transition-all duration-300 text-lg px-12 py-4 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Inscription en cours...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      S&apos;inscrire à la newsletter
                    </div>
                  )}
                </Button>
                
                <p className="text-sm text-gray-500 text-center max-w-md">
                  En vous inscrivant, vous acceptez de recevoir nos communications par email. 
                  Vous pouvez vous désabonner à tout moment.
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
