import { Toaster } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { Poppins } from 'next/font/google'

import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={twMerge('bg-[#1c1d21]', poppins.className)}>
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  )
}
