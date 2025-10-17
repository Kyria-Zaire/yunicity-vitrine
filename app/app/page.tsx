import dynamic from 'next/dynamic'
import HeroSection from '@/components/hero-section'

// Lazy load des sections non-critiques pour améliorer le FCP et LCP
const ProblemSection = dynamic(() => import('@/components/problem-section'), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse" />
})

const SolutionSection = dynamic(() => import('@/components/solution-section'), {
  loading: () => <div className="min-h-screen bg-white animate-pulse" />
})

const FeaturesSection = dynamic(() => import('@/components/features-section'), {
  loading: () => <div className="min-h-screen bg-gray-900 animate-pulse" />
})

const ContactForm = dynamic(() => import('@/components/contact-form'), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white animate-pulse" />
})

const NewsletterSection = dynamic(() => import('@/components/newsletter-section'), {
  loading: () => <div className="min-h-screen bg-white animate-pulse" />
})

const SocialSection = dynamic(() => import('@/components/social-section').then(mod => ({ default: mod.SocialSection })), {
  loading: () => <div className="py-20 bg-gray-50 animate-pulse" />
})

const Footer = dynamic(() => import('@/components/footer'), {
  loading: () => <div className="bg-gradient-to-br from-purple-900 via-violet-900 to-purple-800 py-16 animate-pulse" />
})

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ContactForm />
      <NewsletterSection />
      <SocialSection />
      <Footer />
    </main>
  )
}
