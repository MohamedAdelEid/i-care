import { useMemo } from 'react'
import { Area, AreaChart, Line, LineChart, ResponsiveContainer } from 'recharts'

import { cn } from '@/presentation/utils'

import { ChartA11yFrame } from './chart-accessibility'
import { ChartSkeleton } from './chart-skeleton'
import { getChartThemeColors, getReducedMotion } from './chart-theme'

export interface SparklinePoint {
  value: number
}

export interface SparklineProps {
  data: SparklinePoint[]
  ariaLabel: string
  variant?: 'area' | 'line'
  isLoading?: boolean
  className?: string
  width?: number
  height?: number
}

export const Sparkline = ({
  data,
  ariaLabel,
  variant = 'area',
  isLoading,
  className,
  width = 120,
  height = 32,
}: SparklineProps) => {
  const colors = getChartThemeColors()
  const animate = !getReducedMotion()

  const summary = useMemo(() => {
    if (!data.length) return 'Empty sparkline.'
    const values = data.map((d) => d.value)
    return `Sparkline from ${values[0]} to ${values[values.length - 1]}, min ${Math.min(...values)}, max ${Math.max(...values)}.`
  }, [data])

  if (isLoading) {
    return (
      <ChartSkeleton className={cn('w-auto border-0 p-0 shadow-none', className)} height={height} />
    )
  }

  const chartData = data.map((d, i) => ({ i, value: d.value }))

  return (
    <ChartA11yFrame ariaLabel={ariaLabel} summary={summary} className={className}>
      <div style={{ width, height }} className="shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          {variant === 'line' ? (
            <LineChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors.primary}
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={animate}
              />
            </LineChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
              <Area
                type="monotone"
                dataKey="value"
                stroke={colors.primary}
                fill={colors.primary}
                fillOpacity={0.15}
                strokeWidth={1.5}
                isAnimationActive={animate}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </ChartA11yFrame>
  )
}
