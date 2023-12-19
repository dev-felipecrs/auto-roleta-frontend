import { Header } from '@/components/shared'

interface AccountsLayoutProps {
  children: React.ReactNode
}

export default async function AccountsLayout({
  children,
}: AccountsLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center bg-[#1c1d21]">
        <div className="flex-grow overflow-y-auto p-8">{children}</div>
      </main>
    </>
  )
}
