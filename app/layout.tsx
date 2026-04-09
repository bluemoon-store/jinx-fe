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
    default: 'Jinx - The One-Stop Store for All Digital Purchases',
    template: '%s | Jinx',
  },
  description:
    'Buy gift cards, top-ups, and digital products instantly from trusted brands, all in one secure checkout experience.',
  keywords: ['nextjs', 'react', 'typescript'],
  authors: [{ name: 'Jinx.to Team' }],
  creator: 'Jinx.to',
  icons: {
    icon: [{ url: '/icons/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'android-chrome',
        url: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome',
        url: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/favicons/manifest.json',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Jinx - The One-Stop Store for All Digital Purchases',
    description:
      'Buy gift cards, top-ups, and digital products instantly from trusted brands, all in one secure checkout experience.',
    siteName: 'Jinx',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jinx - The One-Stop Store for All Digital Purchases',
    description:
      'Buy gift cards, top-ups, and digital products instantly from trusted brands, all in one secure checkout experience.',
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
