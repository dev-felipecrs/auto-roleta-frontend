import { Header } from '@/components/shared'

interface AccountsLayoutProps {
  children: React.ReactNode
}

export default async function AccountsLayout({
  children,
}: AccountsLayoutProps) {
  return (
    <>
      <main className="h-screen bg-[#1c1d21]">
        <Header />
        <div className="absolute left-1/2 top-1/2 flex flex-grow -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </>
  )
}
