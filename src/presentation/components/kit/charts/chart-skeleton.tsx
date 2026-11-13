import { Skeleton } from '@/presentation/components/ui/skeleton'
import { cn } from '@/presentation/utils'

export interface ChartSkeletonProps {
  className?: string
  height?: number
}

export const ChartSkeleton = ({ className, height = 240 }: ChartSkeletonProps) => (
  <div
    className={cn('rounded-card border border-border bg-card p-4 shadow-elevation-sm', className)}
    aria-hidden
  >
    <Skeleton className="h-4 w-32" />
    <Skeleton className="mt-4 w-full rounded-control" style={{ height }} />
  </div>
)
