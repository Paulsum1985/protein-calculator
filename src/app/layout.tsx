import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Protein Calculator',
  description: 'Calculate your daily protein needs based on your goals and activity level',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbyard.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="google-adsense" strategy="afterInteractive">
          {`
            (adsbyard = window.adsbyard || []).push({
              google_ad_client: "pub-1522061448979634", // Replace with your publisher ID from AdSense
              enable_page_level_ads: true
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}