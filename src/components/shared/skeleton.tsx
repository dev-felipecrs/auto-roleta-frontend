interface SkeletonProps {
  width: number | string
  height: number | string
}

export function Skeleton({ width, height }: SkeletonProps) {
  return (
    <span
      className="block animate-pulse rounded-full bg-[#0F0F10]"
      style={{ width, height }}
    />
  )
}
