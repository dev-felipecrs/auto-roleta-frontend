import { twMerge } from 'tailwind-merge'
import { Toaster } from 'sonner'
import { Poppins } from 'next/font/google'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Auto Roleta',
    default: 'Auto Roleta',
  },
  icons: {
    icon: '/images/shared/logo-simple.svg',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const CrispWithNoSSR = dynamic(() => import('@/components/shared/crisp-chat'))

  return (
    <html lang="en" className="overflow-x-hidden">
      <CrispWithNoSSR />

      <body className={twMerge('bg-[#1c1d21]', poppins.className)}>
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  )
}
