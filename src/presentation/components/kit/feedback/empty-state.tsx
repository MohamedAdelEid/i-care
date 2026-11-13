import type { ReactNode } from 'react'

import { cn } from '@/presentation/utils'

export interface KitEmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  illustration?: ReactNode
  className?: string
}

export const KitEmptyState = ({
  title,
  description,
  action,
  illustration,
  className,
}: KitEmptyStateProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-border bg-muted/20 px-6 py-12 text-center',
      className,
    )}
  >
    {illustration ? <div className="text-muted-foreground">{illustration}</div> : null}
    <div className="space-y-1">
      <h3 className="text-base font-medium text-foreground">{title}</h3>
      {description ? <p className="max-w-sm text-sm text-muted-foreground">{description}</p> : null}
    </div>
    {action}
  </div>
)
