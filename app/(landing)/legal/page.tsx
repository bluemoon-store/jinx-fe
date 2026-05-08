import FooterServer from '@/components/landing/FooterServer'
import Navbar from '@/components/landing/Navbar'
import LegalServer from '@/components/landing/LegalServer'
import { Reveal } from '@/components/ui/reveal'

export default function LegalPage() {
  return (
    <div className="text-num-14 text-foreground font-nata-sans bg-background flex min-h-screen w-full flex-col text-left">
      <Navbar />
      <main className="flex flex-1 flex-col pt-14 sm:pt-[75px]">
        <Reveal variant="fade-up" threshold={0}>
          <LegalServer />
        </Reveal>
      </main>
      <FooterServer />
    </div>
  )
}
