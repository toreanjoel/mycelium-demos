import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SocketProvider } from './socketContext';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'wsserve - socket-chat',
  description: 'Example chat app made to test accumulative state servers in wsserve',
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
