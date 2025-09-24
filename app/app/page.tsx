
import HeroSection from '@/components/hero-section'
import ProblemSection from '@/components/problem-section'
import SolutionSection from '@/components/solution-section'
import FeaturesSection from '@/components/features-section'
import ContactForm from '@/components/contact-form'
import NewsletterSection from '@/components/newsletter-section'
import { SocialSection } from '@/components/social-section'
import Footer from '@/components/footer'

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
