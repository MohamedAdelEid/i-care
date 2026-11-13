import type { ReactNode } from 'react'

import { cn } from '@/presentation/utils'

export interface KitPageHeaderProps {
  breadcrumb?: ReactNode
  title: ReactNode
  description?: ReactNode
  primaryActions?: ReactNode
  secondaryActions?: ReactNode
  className?: string
}

export const KitPageHeader = ({
  breadcrumb,
  title,
  description,
  primaryActions,
  secondaryActions,
  className,
}: KitPageHeaderProps) => (
  <header className={cn('flex flex-col gap-4', className)}>
    {breadcrumb ? <div className="text-sm text-muted-foreground">{breadcrumb}</div> : null}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description ? (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {(primaryActions || secondaryActions) && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {secondaryActions}
          {primaryActions}
        </div>
      )}
    </div>
  </header>
)
