import { useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

import { ChartA11yFrame } from './chart-accessibility'
import { ChartSkeleton } from './chart-skeleton'
import { getChartThemeColors, getReducedMotion } from './chart-theme'

export interface RadialProgressProps {
  value: number
  max?: number
  ariaLabel: string
  label?: string
  isLoading?: boolean
  className?: string
  size?: number
  framed?: boolean
}

export const RadialProgress = ({
  value,
  max = 100,
  ariaLabel,
  label,
  isLoading,
  className,
  size = 160,
  framed = true,
}: RadialProgressProps) => {
  const colors = getChartThemeColors()
  const animate = !getReducedMotion()
  const clamped = Math.max(0, Math.min(value, max))
  const percent = max > 0 ? Math.round((clamped / max) * 100) : 0

  const pieData = useMemo(
    () => [
      { name: 'progress', value: clamped },
      { name: 'remainder', value: Math.max(max - clamped, 0) },
    ],
    [clamped, max],
  )

  const summary = `${label ? `${label}: ` : ''}${percent}% of ${max}.`

  if (isLoading) return <ChartSkeleton className={className} height={size} />

  return (
    <ChartA11yFrame ariaLabel={ariaLabel} summary={summary} className={className}>
      <div
        className={
          framed
            ? 'relative rounded-card border border-border bg-card shadow-elevation-sm'
            : 'relative'
        }
        style={{ width: size, height: size }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius="72%"
              outerRadius="92%"
              stroke="none"
              isAnimationActive={animate}
            >
              <Cell fill={colors.primary} />
              <Cell fill={colors.muted} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {label ? <span className="text-muted-foreground text-xs">{label}</span> : null}
          <span className="text-foreground stat-value text-xl font-semibold tabular-nums">
            {percent}%
          </span>
        </div>
      </div>
    </ChartA11yFrame>
  )
}
