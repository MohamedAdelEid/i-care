import { Skeleton } from '@/presentation/components/ui/skeleton'
import { cn } from '@/presentation/utils'

export interface KitStatSkeletonProps {
  className?: string
}

export const KitStatSkeleton = ({ className }: KitStatSkeletonProps) => (
  <div className={cn('rounded-card border border-border p-4 shadow-elevation-sm', className)}>
    <Skeleton className="size-9 rounded-control" />
    <Skeleton className="mt-3 h-4 w-24" />
    <Skeleton className="mt-2 h-8 w-16" />
  </div>
)
