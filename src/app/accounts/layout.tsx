import { Header } from '@/components/shared'

interface AccountsLayoutProps {
  children: React.ReactNode
}

export default async function AccountsLayout({
  children,
}: AccountsLayoutProps) {
  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center">
      <Header simpleVersion />
      <div className="flex w-full flex-grow items-center justify-center px-8 py-4">
        {children}
      </div>
    </main>
  )
}
