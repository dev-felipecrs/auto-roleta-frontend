interface CardProps {
  children: React.ReactNode
  title: string
}

export function Card({ children, title }: CardProps) {
  return (
    <section className="flex w-full flex-col gap-8 rounded-xl bg-[#17181D] p-8">
      <strong className="whitespace-nowrap text-base font-medium text-white">
        {title}
      </strong>
      {children}
    </section>
  )
}
