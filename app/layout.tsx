import type { Metadata } from 'next'
import { Commissioner, Nata_Sans } from 'next/font/google'
import localFont from 'next/font/local'

import { Providers } from '@/components/layouts/providers'

import './globals.css'

const fontCommissioner = Commissioner({
  subsets: ['latin'],
  variable: '--font-commissioner',
  display: 'swap',
  weight: ['500', '600', '700'],
})

const fontNataSans = Nata_Sans({
  subsets: ['latin'],
  variable: '--font-nata-sans',
  display: 'swap',
  weight: ['700', '800', '900'],
})

const fontHeydex = localFont({
  src: '../public/fonts/Heydex-Regular.woff',
  variable: '--font-heydex',
  display: 'swap',
  weight: '400',
  style: 'normal',
})

export const metadata: Metadata = {
  title: {
    default: 'Jinx.to',
    template: '%s | Jinx.to',
  },
  description: 'Jinx.to - Modern web application',
  keywords: ['nextjs', 'react', 'typescript'],
  authors: [{ name: 'Jinx.to Team' }],
  creator: 'Jinx.to',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Jinx.to',
    description: 'Jinx.to - Modern web application',
    siteName: 'Jinx.to',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jinx.to',
    description: 'Jinx.to - Modern web application',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontCommissioner.variable} ${fontNataSans.variable} ${fontHeydex.variable} font-commissioner antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
