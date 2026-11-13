import { Skeleton } from '@/presentation/components/ui/skeleton'
import { cn } from '@/presentation/utils'

export interface KitTableSkeletonProps {
  rows?: number
  columns?: number
  className?: string
}

export const KitTableSkeleton = ({ rows = 5, columns = 5, className }: KitTableSkeletonProps) => (
  <div className={cn('rounded-card border border-border overflow-hidden', className)}>
    <div className="flex gap-3 border-b border-border bg-muted/30 px-3 py-3">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, row) => (
      <div key={row} className="flex gap-3 border-b border-border px-3 py-3 last:border-0">
        {Array.from({ length: columns }).map((_, col) => (
          <Skeleton key={col} className="h-4 flex-1" />
        ))}
      </div>
    ))}
  </div>
)
