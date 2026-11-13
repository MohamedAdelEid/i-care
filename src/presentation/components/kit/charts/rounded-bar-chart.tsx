import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { ChartA11yFrame } from './chart-accessibility'
import { ChartSkeleton } from './chart-skeleton'
import { getChartThemeColors, getReducedMotion, getSeriesColor } from './chart-theme'

export interface RoundedBarDatum {
  label: string
  value: number
}

export interface RoundedBarChartProps {
  data: RoundedBarDatum[]
  ariaLabel: string
  dataKey?: string
  isLoading?: boolean
  className?: string
  height?: number
}

export const RoundedBarChart = ({
  data,
  ariaLabel,
  dataKey = 'value',
  isLoading,
  className,
  height = 240,
}: RoundedBarChartProps) => {
  const colors = getChartThemeColors()
  const animate = !getReducedMotion()
  const fill = getSeriesColor(0, colors)

  const summary = useMemo(() => {
    if (!data.length) return 'No bar data.'
    const top = [...data].sort((a, b) => b.value - a.value)[0] ?? data[0]
    const total = data.reduce((sum, row) => sum + row.value, 0)
    return `Bar chart, ${data.length} categories, total ${total}. Highest: ${top?.label ?? 'n/a'} at ${top?.value ?? 0}.`
  }, [data])

  if (isLoading) return <ChartSkeleton className={className} height={height} />

  return (
    <ChartA11yFrame ariaLabel={ariaLabel} summary={summary} className={className}>
      <div className="rounded-card border border-border bg-card p-4 shadow-elevation-sm">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={colors.border} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: colors.mutedForeground, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: colors.mutedForeground, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              isAnimationActive={animate}
              cursor={{ fill: colors.muted }}
              contentStyle={{
                background: colors.muted,
                border: `1px solid ${colors.border}`,
                borderRadius: 10,
                fontSize: 12,
              }}
            />
            <Bar
              dataKey={dataKey}
              fill={fill}
              radius={[8, 8, 0, 0]}
              isAnimationActive={animate}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartA11yFrame>
  )
}
