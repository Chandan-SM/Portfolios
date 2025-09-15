import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PortfolioAI - AI-Powered Portfolio Builder',
  description: 'Create stunning, professional portfolios in minutes with our AI-powered platform. Showcase your skills and get hired.',
  keywords: ['portfolio', 'AI', 'career', 'professional', 'resume', 'showcase'],
  authors: [{ name: 'PortfolioAI Team' }],
  creator: 'PortfolioAI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolioai.com',
    title: 'PortfolioAI - AI-Powered Portfolio Builder',
    description: 'Create stunning, professional portfolios in minutes with our AI-powered platform.',
    siteName: 'PortfolioAI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PortfolioAI - Showcase Yourself. Get Hired.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PortfolioAI - AI-Powered Portfolio Builder',
    description: 'Create stunning, professional portfolios in minutes with our AI-powered platform.',
    images: ['/og-image.jpg'],
    creator: '@portfolioai',
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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}