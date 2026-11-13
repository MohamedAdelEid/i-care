import { useMemo } from 'react'

import { cn } from '@/presentation/utils'

import { ChartA11yFrame } from './chart-accessibility'
import { ChartSkeleton } from './chart-skeleton'
import { getChartThemeColors, getSeriesColor } from './chart-theme'

export interface FunnelStep {
  label: string
  value: number
}

export interface FunnelChartProps {
  steps: FunnelStep[]
  ariaLabel: string
  isLoading?: boolean
  className?: string
  framed?: boolean
}

export const FunnelChart = ({
  steps,
  ariaLabel,
  isLoading,
  className,
  framed = true,
}: FunnelChartProps) => {
  const colors = getChartThemeColors()
  const max = Math.max(...steps.map((s) => s.value), 1)

  const enriched = useMemo(
    () =>
      steps.map((step, index) => {
        const prior = steps[index - 1]
        const prev = index === 0 ? step.value : (prior?.value ?? step.value)
        const dropOff =
          index === 0 || prev === 0 ? 0 : Math.round(((prev - step.value) / prev) * 100)
        return { ...step, dropOff, widthPct: (step.value / max) * 100 }
      }),
    [steps, max],
  )

  const summary = useMemo(
    () =>
      enriched
        .map((s) => `${s.label}: ${s.value}${s.dropOff ? `, drop ${s.dropOff}%` : ''}`)
        .join('; '),
    [enriched],
  )

  if (isLoading) return <ChartSkeleton className={className} height={steps.length * 48} />

  return (
    <ChartA11yFrame ariaLabel={ariaLabel} summary={summary} className={className}>
      <ol
        className={
          framed
            ? 'space-y-3 rounded-card border border-border bg-card p-4 shadow-elevation-sm'
            : 'space-y-3'
        }
      >
        {enriched.map((step, index) => {
          const fill = getSeriesColor(index, colors)
          return (
            <li key={step.label} className="space-y-1">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium">{step.label}</span>
                <span className="text-muted-foreground tabular-nums">
                  {step.value.toLocaleString()}
                  {step.dropOff > 0 ? (
                    <span className="text-warning ms-2 text-xs">−{step.dropOff}%</span>
                  ) : null}
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted">
                <div
                  className={cn('h-3 rounded-full transition-[width] duration-200')}
                  style={{ width: `${step.widthPct}%`, backgroundColor: fill }}
                />
              </div>
            </li>
          )
        })}
      </ol>
    </ChartA11yFrame>
  )
}
