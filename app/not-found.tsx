import Link from 'next/link'
import FooterServer from '@/components/landing/FooterServer'
import Navbar from '@/components/landing/Navbar'
import { Reveal } from '@/components/ui/reveal'

export default function NotFound() {
  return (
    <div className="text-num-14 font-commissioner flex min-h-screen w-full flex-col bg-gray-400 text-center text-white">
      <Navbar />
      {/* Main 404 content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-24 pb-16 sm:px-6 sm:pt-[125px] sm:pb-24 lg:px-8">
        <Reveal variant="fade-up" threshold={0}>
          <section className="flex max-w-lg flex-col items-center gap-6 text-center">
            <img
              src="/icons/404.svg"
              alt="Page not found illustration"
              className="h-auto w-full max-w-[336px] sm:max-w-[420px] lg:max-w-[536px]"
            />
            <h1 className="text-ghostwhite font-nata-sans tracking-num-0.02 text-[40px] leading-[42px] font-black uppercase [text-shadow:0px_0px_18.58px_rgba(0,0,0,0.6)]">
              PAGE DOES NOT EXIST
            </h1>
            <p className="leading-num-20 font-medium opacity-75 [text-shadow:0px_0px_8.63px_rgba(0,0,0,0.6)]">
              It may have been moved, renamed or temporarily unavailable. Please check the URL or
              contact our support for more assistance.
            </p>
            <Link
              href="/"
              className="font-commissioner box-border flex h-12 min-h-[44px] w-full items-center justify-center gap-[7.8px] rounded-[7.79px] bg-fuchsia-100 px-8 py-3 text-left text-white shadow-[0px_2px_0px_rgba(235,45,255,0.5)] transition-opacity hover:opacity-90 sm:w-auto sm:px-12"
            >
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="tracking-num--0_01 leading-num-28 font-semibold">
                Back to Homepage
              </span>
            </Link>
          </section>
        </Reveal>
      </main>

      <FooterServer />
    </div>
  )
}
