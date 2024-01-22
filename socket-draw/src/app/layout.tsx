import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SocketProvider } from './socketContext';
import './globals.css'

const inter = Inter({ subsets: [] })

export const metadata: Metadata = {
  title: 'wsserve - socket-draw',
  description: 'Example draw app made to test shared state servers in wsserve',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SocketProvider>
        <body className={inter.className}>{children}</body>
      </SocketProvider>
    </html>
  )
}
