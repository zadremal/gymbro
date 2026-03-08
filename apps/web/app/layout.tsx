import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GymBro — Plate Calculator',
  description: 'Calculate the optimal barbell plate setup for your gym session. Minimizes plate swaps across multiple exercises.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
