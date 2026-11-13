import type { ReactNode } from 'react'

import { cn } from '@/presentation/utils'

export interface KitFilterBarProps {
  children?: ReactNode
  start?: ReactNode
  end?: ReactNode
  className?: string
}

export const KitFilterBar = ({ children, start, end, className }: KitFilterBarProps) => (
  <div
    className={cn(
      'flex flex-col gap-3 rounded-card border border-border bg-card p-3 shadow-elevation-sm md:flex-row md:flex-wrap md:items-center md:justify-between',
      className,
    )}
  >
    {start ? <div className="flex flex-wrap items-center gap-2">{start}</div> : null}
    {children}
    {end ? <div className="flex flex-wrap items-center gap-2">{end}</div> : null}
  </div>
)
