
'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { trackInvestorContact } from './google-analytics'
import toast from 'react-hot-toast'

interface ContactFormData {
  name: string
  email: string
  company: string
  investorType: string
  investmentRange: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    investorType: '',
    investmentRange: '',
    message: ''
  })

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Veuillez remplir les champs obligatoires')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Message envoyé ! Nous vous recontacterons sous 24h.')
        
        // Track investor contact for analytics
        trackInvestorContact(formData.investorType || 'unknown', formData.investmentRange || 'unknown')
        
        setFormData({
          name: '',
          email: '',
          company: '',
          investorType: '',
          investmentRange: '',
          message: ''
        })
      } else {
        throw new Error(data.error || 'Erreur lors de l\'envoi')
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du message')
      console.error('Contact form error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            💰 Investisseurs & Partenaires
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Rejoignez l'Aventure Yunicity
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vous êtes investisseur, business angel ou partenaire potentiel ? 
            Découvrons ensemble comment révolutionner les communautés locales !
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-900">
              💼 Parlons Business
            </CardTitle>
            <CardDescription className="text-base">
              Nous recherchons des partenaires visionnaires pour accélérer notre développement
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations personnelles */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Nom complet *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Dupont"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email professionnel *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@venture-capital.com"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                      Société / Fonds
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Venture Capital Partners"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Profil investisseur */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="investorType" className="text-sm font-medium text-gray-700">
                      Profil investisseur
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('investorType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionnez votre profil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business-angel">Business Angel</SelectItem>
                        <SelectItem value="vc-fund">Fonds de Venture Capital</SelectItem>
                        <SelectItem value="corporate-vc">Corporate VC</SelectItem>
                        <SelectItem value="family-office">Family Office</SelectItem>
                        <SelectItem value="crowdfunding">Plateforme de Crowdfunding</SelectItem>
                        <SelectItem value="strategic-partner">Partenaire Stratégique</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="investmentRange" className="text-sm font-medium text-gray-700">
                      Ticket d'investissement
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('investmentRange', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Montant envisagé" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-50k">Moins de 50K €</SelectItem>
                        <SelectItem value="50k-100k">50K - 100K €</SelectItem>
                        <SelectItem value="100k-250k">100K - 250K €</SelectItem>
                        <SelectItem value="250k-500k">250K - 500K €</SelectItem>
                        <SelectItem value="500k-1m">500K - 1M €</SelectItem>
                        <SelectItem value="above-1m">Plus de 1M €</SelectItem>
                        <SelectItem value="strategic-only">Partenariat uniquement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
                    <h4 className="font-medium text-emerald-800 mb-2">🎯 Objectif de levée</h4>
                    <p className="text-sm text-emerald-700">
                      Nous recherchons <span className="font-semibold">300K - 500K €</span> pour 
                      accélérer notre développement sur la région Grand Est.
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Votre message *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Parlez-nous de votre intérêt pour Yunicity : secteurs d'investissement, expérience dans les communautés locales, questions sur notre modèle économique..."
                  className="mt-1 min-h-[120px]"
                  required
                />
              </div>

              {/* Call to action */}
              <div className="text-center pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🚀</span>
                      Démarrons la Discussion
                    </>
                  )}
                </Button>
                
                <p className="mt-4 text-sm text-gray-500">
                  Réponse garantie sous 24h • Échange confidentiel
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
