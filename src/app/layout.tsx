import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  )
}
