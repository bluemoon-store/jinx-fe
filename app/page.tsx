import FAQSectionServer from '@/components/landing/FAQSectionServer'
import FeaturesSection from '@/components/landing/FeaturesSection'
import FooterServer from '@/components/landing/FooterServer'
import FreshlyRestockedSection from '@/components/landing/FreshlyRestockedSection'
import HeroSection from '@/components/landing/HeroSection'
import HowToPurchaseSection from '@/components/landing/HowToPurchaseSection'
import { LandingPageReadyGate } from '@/components/landing/LandingPageReadyGate'
import Navbar from '@/components/landing/Navbar'
import NewlyLaunchedSection from '@/components/landing/NewlyLaunchedSection'
import SellingSection from '@/components/landing/SellingSection'
import { getLandingTexts } from '@/lib/landing-texts'

export default async function LandingPage() {
  const texts = await getLandingTexts()

  return (
    <LandingPageReadyGate>
      <div className="text-num-14 text-foreground font-nata-sans bg-background flex min-h-screen w-full flex-col text-center">
        <Navbar />
        <main className="flex flex-1 flex-col gap-16 pt-14 sm:gap-20 sm:pt-[75px] lg:gap-24">
          <HeroSection title={texts.heroTitle} subtitle={texts.heroSubtitle} />
          <SellingSection description={texts.hotSellingDesc} />
          <FreshlyRestockedSection description={texts.freshlyDesc} />
          <NewlyLaunchedSection description={texts.newlyDesc} />
          <HowToPurchaseSection description={texts.howToDesc} />
          <FeaturesSection description={texts.featuresDesc} />
          <FAQSectionServer description={texts.faqDesc} />
          <FooterServer />
        </main>
      </div>
    </LandingPageReadyGate>
  )
}
