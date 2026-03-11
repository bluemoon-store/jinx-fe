import CategoryTabs from '@/components/landing/CategoryTabs'
import FAQSection from '@/components/landing/FAQSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import Footer from '@/components/landing/Footer'
import FreshlyRestockedSection from '@/components/landing/FreshlyRestockedSection'
import HeroSection from '@/components/landing/HeroSection'
import HowToPurchaseSection from '@/components/landing/HowToPurchaseSection'
import Navbar from '@/components/landing/Navbar'
import NewlyLaunchedSection from '@/components/landing/NewlyLaunchedSection'
import SellingSection from '@/components/landing/SellingSection'

export default function LandingPage() {
  return (
    <div className="text-num-14 text-ghostwhite font-nata-sans relative h-[4822px] w-full overflow-hidden bg-gray-400 text-center">
      <HeroSection />
      <Navbar />
      <SellingSection />
      <FeaturesSection />
      <HowToPurchaseSection />
      <FAQSection />
      <Footer />
      <CategoryTabs />
      <FreshlyRestockedSection />
      <NewlyLaunchedSection />
    </div>
  )
}
