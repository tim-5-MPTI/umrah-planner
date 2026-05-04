import HeroSection from '@/components/landing/HeroSection'
import PainPointSection from '@/components/landing/PainPointSection'
import StepsSection from '@/components/landing/StepsSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import CtaSection from '@/components/landing/CtaSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PainPointSection />
      <StepsSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  )
}