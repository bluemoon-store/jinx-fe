import Footer from '@/components/landing/Footer'
import FAQs from '@/components/landing/FAQs'
import Navbar from '@/components/landing/Navbar'

export default function FAQsPage() {
  return (
    <div className="text-num-14 text-ghostwhite font-nata-sans flex min-h-screen w-full flex-col bg-gray-400 text-left">
      <Navbar />
      <main className="flex flex-1 flex-col overflow-x-hidden">
        <FAQs />
      </main>
      <Footer />
    </div>
  )
}
