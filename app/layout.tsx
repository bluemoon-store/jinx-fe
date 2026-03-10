import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import { Providers } from '@/components/layouts/providers'

import './globals.css'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Bluemoon',
    template: '%s | Bluemoon',
  },
  description: 'Bluemoon - Modern web application',
  keywords: ['nextjs', 'react', 'typescript'],
  authors: [{ name: 'Bluemoon Team' }],
  creator: 'Bluemoon',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Bluemoon',
    description: 'Bluemoon - Modern web application',
    siteName: 'Bluemoon',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bluemoon',
    description: 'Bluemoon - Modern web application',
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
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
