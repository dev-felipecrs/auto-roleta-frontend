import { Header } from '@/components/shared'

interface AccountsLayoutProps {
  children: React.ReactNode
}

export default async function AccountsLayout({
  children,
}: AccountsLayoutProps) {
  return (
    <>
      <main className="h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </>
  )
}
