import { cn } from '@/presentation/utils'

interface MiniSparklineProps {
  values: number[]
  className?: string
  strokeClassName?: string
}

export const MiniSparkline = ({
  values,
  className,
  strokeClassName = 'stroke-primary',
}: MiniSparklineProps) => {
  if (!values.length) return null

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const width = 64
  const height = 24
  const step = values.length > 1 ? width / (values.length - 1) : width

  const points = values
    .map((v, i) => {
      const x = i * step
      const y = height - ((v - min) / range) * (height - 2) - 1
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn('h-6 w-16 shrink-0', className)}
      aria-hidden
    >
      <polyline
        fill="none"
        className={cn(strokeClassName)}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}
