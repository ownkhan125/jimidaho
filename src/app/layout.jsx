import { Unbounded, Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'

const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const jet = JetBrains_Mono({
  variable: '--font-jet',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://jimhartleyforidaho.example'),
  title: {
    default: "Jim Hartley for Congress — Idaho's 1st District",
    template: '%s · Jim Hartley for Congress',
  },
  description:
    "A new chapter for Idaho. Jim Hartley is running for U.S. Congress to bring honest leadership, common-sense policy, and a steady hand to Idaho's 1st District.",
  openGraph: {
    title: "Jim Hartley for Congress — Idaho's 1st District",
    description:
      "A new chapter for Idaho. Honest leadership, common-sense policy, and a steady hand for Idaho's 1st District.",
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#f2eae0',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${unbounded.variable} ${inter.variable} ${jet.variable} h-full`}>
      <body className="min-h-full bg-cream text-ink-900 antialiased">{children}</body>
    </html>
  )
}
