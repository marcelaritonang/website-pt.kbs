import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PT Karya Bangun Semesta',
  description: 'Konstruksi berkualitas dengan standar internasional',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}