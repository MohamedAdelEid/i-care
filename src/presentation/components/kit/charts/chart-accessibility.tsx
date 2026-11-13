import type { ReactNode } from 'react'

import { cn } from '@/presentation/utils'

export interface ChartA11yProps {
  ariaLabel: string
  summary: string
  className?: string
  children: ReactNode
}

export const ChartA11yFrame = ({ ariaLabel, summary, className, children }: ChartA11yProps) => (
  <figure className={cn('w-full', className)} role="img" aria-label={ariaLabel}>
    <span className="sr-only">{summary}</span>
    {children}
  </figure>
)
