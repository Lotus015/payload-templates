import type { Metadata } from 'next'
import { Merriweather, Lora } from 'next/font/google'
import '../globals.css'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Traditional Law Firm Template',
  description: 'Professional law firm website built with Next.js and Payload CMS',
}

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${merriweather.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
