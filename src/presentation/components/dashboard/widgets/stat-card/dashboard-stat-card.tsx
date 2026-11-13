import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { MOTION_SLOW_S, PAGE_EASE } from '@/presentation/utils/motion'
import { cn } from '@/presentation/utils'
import { StatSparkline, type SparklineTrend } from './stat-sparkline'

export type StatTrendDirection = 'up' | 'down' | 'neutral'

export interface DashboardStatCardProps {
  title: string
  value: string | number
  description?: string
  highlight?: string
  trend?: {
    value: string
    label: string
    direction: StatTrendDirection
  }
  icon: LucideIcon
  sparklineData: number[]
  sparklineTrend?: SparklineTrend
  index?: number
  className?: string
}

const trendTextClass: Record<StatTrendDirection, string> = {
  up: 'text-success',
  down: 'text-danger',
  neutral: 'text-muted-foreground',
}

export const DashboardStatCard = ({
  title,
  value,
  description,
  highlight,
  trend,
  icon: Icon,
  sparklineData,
  sparklineTrend = 'positive',
  index = 0,
  className,
}: DashboardStatCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: MOTION_SLOW_S, ease: PAGE_EASE, delay: index * 0.05 }}
    className={cn(
      'flex flex-col overflow-hidden rounded-card border border-border bg-card shadow-elevation-xs',
      className,
    )}
  >
    <div className="relative flex items-start justify-between gap-3 px-4 pt-3 pb-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <Icon className="size-4 shrink-0 text-muted-foreground/70" strokeWidth={1.75} />
    </div>

    <div className="mx-2 mb-2 rounded-control border border-border/60 bg-background px-3.5 py-3">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: MOTION_SLOW_S, delay: index * 0.05 + 0.08, ease: PAGE_EASE }}
            className="stat-value text-[1.65rem] leading-none font-semibold tracking-tight text-foreground"
            data-stat
          >
            {value}
          </motion.p>

          {(trend || description || highlight) && (
            <div className="space-y-0.5 text-xs leading-snug">
              {trend && (
                <p className={cn('font-medium tabular-nums', trendTextClass[trend.direction])}>
                  {trend.value}{' '}
                  <span className="font-normal text-muted-foreground">{trend.label}</span>
                </p>
              )}

              {description && (
                <p className="truncate text-muted-foreground sm:whitespace-normal">
                  {description}
                  {highlight && (
                    <>
                      {' '}
                      <span className="font-medium text-danger">({highlight})</span>
                    </>
                  )}
                </p>
              )}
            </div>
          )}
        </div>

        <StatSparkline
          data={sparklineData}
          trend={sparklineTrend}
          delay={index * 0.05 + 0.08}
        />
      </div>
    </div>
  </motion.article>
)
