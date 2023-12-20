import { Header, Sidebar } from '@/components/shared'

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-[auto,1fr]">
        <Sidebar />
        <div className="h-screen"></div>
      </main>
    </>
  )
}
