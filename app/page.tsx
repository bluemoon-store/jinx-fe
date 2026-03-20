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
    <div className="text-num-14 text-ghostwhite font-nata-sans flex min-h-screen w-full flex-col bg-gray-400 text-center">
      <Navbar />
      <main className="flex flex-1 flex-col gap-16 pt-14 sm:gap-20 sm:pt-[75px] lg:gap-24">
        <HeroSection />
        <SellingSection />
        <FreshlyRestockedSection />
        <NewlyLaunchedSection />
        <HowToPurchaseSection />
        <FeaturesSection />
        <FAQSection />
        <Footer />
      </main>
    </div>
  )
}
