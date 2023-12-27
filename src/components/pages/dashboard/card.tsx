interface CardProps {
  children: React.ReactNode
  title: string
  headerLeftElement?: JSX.Element
}

export function Card({ children, title, headerLeftElement }: CardProps) {
  return (
    <section className="flex h-full w-full flex-col gap-8 rounded-xl bg-[#17181D] p-8">
      <header className="flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between">
        <strong className="whitespace-nowrap text-base font-medium text-white">
          {title}
        </strong>

        {headerLeftElement && headerLeftElement}
      </header>
      {children}
    </section>
  )
}
