import { cn } from '@/presentation/utils'

export interface KitProgressCellProps {
  value: number
  max?: number
  label?: string
  className?: string
}

export const KitProgressCell = ({ value, max = 100, label, className }: KitProgressCellProps) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn('flex min-w-[6rem] flex-col gap-1', className)}>
      {label ? (
        <span className="text-xs text-muted-foreground tabular-nums">
          {label}
        </span>
      ) : null}
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-200"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}
