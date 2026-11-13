import { Skeleton } from '@/presentation/components/ui/skeleton'

export const NotificationSkeletonList = ({ count = 4 }: { count?: number }) => (
  <div className="space-y-2 p-2" aria-hidden>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex items-start gap-3 rounded-lg px-2 py-2.5">
        <Skeleton className="size-8 shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    ))}
  </div>
)
