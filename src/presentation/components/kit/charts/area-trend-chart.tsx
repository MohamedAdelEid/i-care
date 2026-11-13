import { useId, useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Button } from '@/presentation/components/ui/button'

import { ChartA11yFrame } from './chart-accessibility'
import { ChartSkeleton } from './chart-skeleton'
import {
  getChartThemeColors,
  getReducedMotion,
  getSeriesColor,
  type TrendRange,
} from './chart-theme'

export interface AreaTrendPoint {
  label: string
  [key: string]: string | number
}

export interface AreaTrendSeries {
  key: string
  name: string
  color?: string
  stackId?: string
}

export interface AreaTrendChartProps {
  data: AreaTrendPoint[]
  series: AreaTrendSeries[]
  ariaLabel: string
  range?: TrendRange
  onRangeChange?: (range: TrendRange) => void
  showRangeToggle?: boolean
  isLoading?: boolean
  className?: string
  height?: number
  /** When false, omit outer card chrome (for nesting in panels). */
  framed?: boolean
}

const RANGE_OPTIONS: TrendRange[] = ['7D', '30D', '90D']

export const AreaTrendChart = ({
  data,
  series,
  ariaLabel,
  range,
  onRangeChange,
  showRangeToggle = Boolean(onRangeChange),
  isLoading,
  className,
  height = 260,
  framed = true,
}: AreaTrendChartProps) => {
  const gradientId = useId().replace(/:/g, '')
  const colors = getChartThemeColors()
  const animate = !getReducedMotion()

  const summary = useMemo(() => {
    if (!data.length || !series.length) return 'No trend data.'
    const last = data.at(-1)
    if (!last) return 'No trend data.'
    const parts = series.map((s) => `${s.name}: ${last[s.key] ?? 0}`)
    return `Trend chart with ${data.length} points. Latest values — ${parts.join('; ')}.`
  }, [data, series])

  if (isLoading) return <ChartSkeleton className={className} height={height} />

  return (
    <ChartA11yFrame ariaLabel={ariaLabel} summary={summary} className={className}>
      <div
        className={
          framed
            ? 'rounded-card border border-border bg-card p-4 shadow-elevation-sm'
            : undefined
        }
      >
        {showRangeToggle && onRangeChange ? (
          <div className="mb-3 flex justify-end gap-1">
            {RANGE_OPTIONS.map((option) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant={range === option ? 'default' : 'outline'}
                onClick={() => onRangeChange(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        ) : null}
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              {series.map((s, i) => {
                const fill = s.color ?? getSeriesColor(i, colors)
                return (
                  <linearGradient
                    key={s.key}
                    id={`${gradientId}-${s.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={fill} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={fill} stopOpacity={0.02} />
                  </linearGradient>
                )
              })}
            </defs>
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
              cursor={{ stroke: colors.border }}
              contentStyle={{
                background: colors.muted,
                border: `1px solid ${colors.border}`,
                borderRadius: 10,
                fontSize: 12,
              }}
              labelStyle={{ color: colors.foreground }}
              itemStyle={{ color: colors.foreground }}
            />
            {series.map((s, i) => {
              const stroke = s.color ?? getSeriesColor(i, colors)
              return (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name}
                  stackId={s.stackId}
                  stroke={stroke}
                  fill={`url(#${gradientId}-${s.key})`}
                  strokeWidth={2}
                  isAnimationActive={animate}
                />
              )
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartA11yFrame>
  )
}
