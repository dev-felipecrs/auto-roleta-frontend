interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
}

export function Switch({ children, ...rest }: SwitchProps) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input {...rest} type="checkbox" className="peer sr-only" />

      <div className="peer h-5 w-9 rounded-full after:absolute after:start-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-[#A6A8B1] after:transition-all after:content-[''] peer-checked:bg-[#e51e3e] peer-checked:after:translate-x-full peer-checked:after:bg-white rtl:peer-checked:after:-translate-x-full dark:bg-[#383C48]"></div>

      {children && (
        <span className="ms-3 text-sm font-medium text-white">{children}</span>
      )}
    </label>
  )
}
