import type { LucideIcon } from 'lucide-react'
import { Info, TrendingDown, TrendingUp } from 'lucide-react'

import { Skeleton } from '@/presentation/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/presentation/components/ui/tooltip'
import { cn } from '@/presentation/utils'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { MiniSparkline } from './mini-sparkline'
import { useCountUp } from './use-count-up'

export type StatTrend = {
  direction: 'up' | 'down' | 'neutral'
  value: string
  label?: string
}

export interface StatCardProps {
  icon: LucideIcon
  label: string
  value: number | string
  tip?: string
  trend?: StatTrend
  sparkline?: number[]
  loading?: boolean
  onClick?: () => void
  className?: string
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  tip,
  trend,
  sparkline,
  loading,
  onClick,
  className,
}: StatCardProps) => {
  const { t } = useTranslation('kit')
  const isNumber = typeof value === 'number'
  const animated = useCountUp(isNumber ? value : 0, 600, isNumber && !loading)

  const displayValue = isNumber ? animated.toLocaleString() : value

  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <span className="flex size-9 items-center justify-center rounded-control border border-border bg-muted/40 text-muted-foreground">
          <Icon className="size-4" aria-hidden />
        </span>
        {sparkline?.length ? <MiniSparkline values={sparkline} /> : null}
      </div>
      <div className="mt-3 space-y-0.5">
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>{label}</span>
          {tip ? (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex size-4 items-center justify-center rounded-full"
                    aria-label={tip}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Info className="size-3" aria-hidden />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-xs">
                  {tip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </p>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <p className="stat-value text-2xl font-semibold tabular-nums text-foreground" data-stat>
            {displayValue}
          </p>
        )}
      </div>
      {trend && !loading ? (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          {trend.direction === 'up' ? (
            <TrendingUp className="size-3.5 text-success" aria-label={t('trendUp')} />
          ) : trend.direction === 'down' ? (
            <TrendingDown className="size-3.5 text-destructive" aria-label={t('trendDown')} />
          ) : null}
          <span
            className={cn(
              trend.direction === 'up' && 'text-success',
              trend.direction === 'down' && 'text-destructive',
            )}
          >
            {trend.value}
          </span>
          {trend.label ? <span>{trend.label}</span> : null}
        </div>
      ) : null}
    </>
  )

  const cardClass = cn(
    'rounded-card border border-border bg-card p-4 shadow-elevation-sm transition-colors',
    onClick && 'cursor-pointer hover:bg-muted/30',
    className,
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(cardClass, 'text-start w-full')}>
        {inner}
      </button>
    )
  }

  return <div className={cardClass}>{inner}</div>
}
