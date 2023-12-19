interface AccountsLayoutProps {
  children: React.ReactNode
}

export default async function AccountsLayout({
  children,
}: AccountsLayoutProps) {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-[#1c1d21] p-8">
      {children}
    </main>
  )
}
