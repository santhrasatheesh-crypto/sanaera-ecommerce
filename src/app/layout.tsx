import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SANAÉRA - For Every Version of You',
  description: 'Luxury Fashion E-Commerce - Desi Heritage Inspired Contemporary Fashion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-cream text-deep-espresso font-sans">
        {children}
      </body>
    </html>
  )
}
