import Image from 'next/image'

export function Header() {
  return (
    <header className="max-w-screen flex h-20 items-center border-b-[1px] border-[#ffffff26] bg-[#1c1d21] px-8 py-4">
      <div className="relative h-12 w-40">
        <Image src="/images/shared/logo.svg" alt="Auto Roleta" fill />
      </div>
    </header>
  )
}
