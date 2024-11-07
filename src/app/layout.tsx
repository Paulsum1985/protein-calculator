import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Protein Calculator - Daily Protein Intake Calculator',
  description: 'Calculate your personalized daily protein needs based on your weight, activity level, and fitness goals. Get a customized meal plan and learn about protein sources.',
  keywords: 'protein calculator, protein intake calculator, daily protein needs, protein requirements, muscle building, weight loss, nutrition calculator',
  metadataBase: new URL('https://protein-calculator.co.uk'),
  openGraph: {
    title: 'Protein Calculator - Daily Protein Intake Calculator',
    description: 'Calculate your personalized daily protein needs based on your weight, activity level, and fitness goals.',
    url: 'https://protein-calculator.co.uk',
    siteName: 'Protein Calculator',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg', // You can add an OG image later
        width: 1200,
        height: 630,
        alt: 'Protein Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protein Calculator - Daily Protein Intake Calculator',
    description: 'Calculate your personalized daily protein needs based on your weight, activity level, and fitness goals.',
    creator: '@yourtwitterhandle', // Optional: add if you have a Twitter account
  },
  alternates: {
    canonical: 'https://protein-calculator.co.uk'
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
  verification: {
    google: 'your-google-verification-code', // Add this when you have Google Search Console set up
  },
  authors: [
    { name: 'Your Name or Company Name' }
  ],
  category: 'Health & Fitness',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1522061448979634" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1522061448979634"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="google-adsense" strategy="afterInteractive">
          {`
            (adsbyard = window.adsbyard || []).push({
              google_ad_client: "pub-1522061448979634",
              enable_page_level_ads: true
            });
          `}
        </Script>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}