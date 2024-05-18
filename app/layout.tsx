import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] },)

export const metadata: Metadata = {
  title: 'Eventium',
  description: 'Events app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark:bg-[#011E2B] bg-white'>
        <meta name="google" content="The best events in Varna BG" key="notranslate" />
        <meta name="google-site-verification" content="kptgP0ZcFIb-H7uFL3eic-gblPSt0A2HhpvhcyHHadU" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
