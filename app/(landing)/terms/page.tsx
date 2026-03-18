import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import Terms from '@/components/landing/Terms'

export default function TermsPage() {
  return (
    <div className="text-num-14 text-ghostwhite font-nata-sans flex min-h-screen w-full flex-col bg-gray-400 text-left">
      <Navbar />
      <main className="flex flex-1 flex-col overflow-x-hidden">
        <Terms />
      </main>
      <Footer />
    </div>
  )
}
