import { useMemo, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { cn } from '@/presentation/utils'

import { ChartA11yFrame } from './chart-accessibility'
import { ChartSkeleton } from './chart-skeleton'
import { getChartThemeColors, getReducedMotion, getSeriesColor } from './chart-theme'

export interface DonutSlice {
  name: string
  value: number
  color?: string
}

export interface DonutChartProps {
  data: DonutSlice[]
  ariaLabel: string
  centerLabel?: string
  isLoading?: boolean
  className?: string
  height?: number
  framed?: boolean
}

export const DonutChart = ({
  data,
  ariaLabel,
  centerLabel,
  isLoading,
  className,
  height = 260,
  framed = true,
}: DonutChartProps) => {
  const colors = getChartThemeColors()
  const animate = !getReducedMotion()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data])

  const summary = useMemo(() => {
    if (!data.length) return 'No donut data.'
    return data.map((d) => `${d.name} ${d.value}`).join('; ') + `. Total ${total}.`
  }, [data, total])

  if (isLoading) return <ChartSkeleton className={className} height={height} />

  const resolved = data.map((d, i) => ({
    ...d,
    color: d.color ?? getSeriesColor(i, colors),
  }))

  return (
    <ChartA11yFrame ariaLabel={ariaLabel} summary={summary} className={className}>
      <div
        className={
          framed
            ? 'rounded-card border border-border bg-card p-4 shadow-elevation-sm'
            : undefined
        }
      >
        <div className="relative" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={resolved}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="82%"
                paddingAngle={2}
                isAnimationActive={animate}
              >
                {resolved.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    opacity={
                      activeIndex === null || activeIndex === index ? 1 : 0.35
                    }
                    stroke={colors.border}
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip
                isAnimationActive={animate}
                contentStyle={{
                  background: colors.muted,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-muted-foreground text-xs">{centerLabel ?? 'Total'}</span>
            <span className="text-foreground stat-value text-2xl font-semibold tabular-nums">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
        <ul className="mt-3 flex flex-wrap justify-center gap-2">
          {resolved.map((slice, index) => (
            <li key={slice.name}>
              <button
                type="button"
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-pill border px-2 py-0.5 text-xs transition-colors',
                  activeIndex === index
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:bg-muted',
                )}
                onClick={() =>
                  setActiveIndex((prev) => (prev === index ? null : index))
                }
              >
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: slice.color }}
                  aria-hidden
                />
                {slice.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ChartA11yFrame>
  )
}
