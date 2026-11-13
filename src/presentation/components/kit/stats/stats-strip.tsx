import type { ReactNode } from 'react'

import { cn } from '@/presentation/utils'

import { StatCard, type StatCardProps } from './stat-card'

export interface StatsStripProps {
  children?: ReactNode
  items?: StatCardProps[]
  className?: string
}

export const StatsStrip = ({ children, items, className }: StatsStripProps) => (
  <div
    className={cn(
      'grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
      className,
    )}
  >
    {children}
    {items?.map((item, index) => (
      <StatCard key={`${item.label}-${index}`} {...item} />
    ))}
  </div>
)
