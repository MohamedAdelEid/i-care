import { useMemo, useState } from 'react'

import { cn } from '@/presentation/utils'

import { ChartA11yFrame } from './chart-accessibility'
import { ChartSkeleton } from './chart-skeleton'
import { getChartThemeColors } from './chart-theme'

export interface HeatmapCell {
  day: number
  hour: number
  intensity: number
  closed?: boolean
}

export interface HeatmapProps {
  cells: HeatmapCell[]
  ariaLabel: string
  maxIntensity?: number
  isLoading?: boolean
  className?: string
  /** Override default Mon–Sun labels. */
  dayLabels?: string[]
  /**
   * When set, each column is a named slot (hour = column index).
   * Otherwise renders 24 hourly columns with default 0/4/8/12/16/20 labels.
   */
  slotLabels?: string[]
  /** Day indices marked closed (muted cells, no intensity). */
  closedDays?: number[]
  framed?: boolean
}

const DEFAULT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DEFAULT_HOUR_TICKS = [0, 4, 8, 12, 16, 20]

export const Heatmap = ({
  cells,
  ariaLabel,
  maxIntensity,
  isLoading,
  className,
  dayLabels,
  slotLabels,
  closedDays,
  framed = true,
}: HeatmapProps) => {
  const colors = getChartThemeColors()
  const [tip, setTip] = useState<string | null>(null)
  const days = dayLabels?.length ? dayLabels : DEFAULT_DAYS
  const closed = useMemo(() => new Set(closedDays ?? []), [closedDays])
  const slotMode = Boolean(slotLabels?.length)
  const columns = slotMode ? (slotLabels?.length ?? 0) : 24

  const max = maxIntensity ?? Math.max(...cells.map((c) => c.intensity), 1)
  const cellMap = useMemo(() => {
    const map = new Map<string, HeatmapCell>()
    for (const cell of cells) {
      map.set(`${cell.day}-${cell.hour}`, cell)
    }
    return map
  }, [cells])

  const summary = useMemo(() => {
    const openCells = cells.filter((c) => !c.closed && !closed.has(c.day))
    const peak = openCells.reduce(
      (best, c) => (c.intensity > best.intensity ? c : best),
      openCells[0] ?? { day: 0, hour: 0, intensity: 0 },
    )
    return `Activity heatmap. Peak intensity ${peak.intensity} on day ${peak.day}, slot ${peak.hour}.`
  }, [cells, closed])

  if (isLoading) return <ChartSkeleton className={className} height={200} />

  const rowH = 18
  const chartH = 18 + days.length * rowH
  const labelW = 44
  const chartW = 288

  return (
    <ChartA11yFrame ariaLabel={ariaLabel} summary={summary} className={className}>
      <div
        className={
          framed
            ? 'rounded-card border border-border bg-card p-4 shadow-elevation-sm'
            : undefined
        }
      >
        {tip ? (
          <p className="text-muted-foreground mb-2 text-xs" aria-live="polite">
            {tip}
          </p>
        ) : null}
        <svg viewBox={`0 0 340 ${chartH + 8}`} className="w-full max-w-full" role="presentation">
          {days.map((dayLabel, day) => (
            <text
              key={`${dayLabel}-${day}`}
              x={labelW}
              y={22 + day * rowH}
              className={cn('fill-muted-foreground', closed.has(day) && 'opacity-40')}
              fontSize={10}
              textAnchor="end"
            >
              {dayLabel}
            </text>
          ))}
          {slotMode
            ? (slotLabels ?? []).map((label, i) => (
                <text
                  key={label}
                  x={52 + (i + 0.5) * (chartW / columns)}
                  y={12}
                  className="fill-muted-foreground"
                  fontSize={9}
                  textAnchor="middle"
                >
                  {label}
                </text>
              ))
            : DEFAULT_HOUR_TICKS.map((hour) => (
                <text
                  key={hour}
                  x={52 + (hour / 24) * chartW}
                  y={12}
                  className="fill-muted-foreground"
                  fontSize={10}
                  textAnchor="middle"
                >
                  {hour}:00
                </text>
              ))}
          {days.map((dayLabel, day) =>
            Array.from({ length: columns }, (_, hour) => {
              const cell = cellMap.get(`${day}-${hour}`)
              const isClosed = cell?.closed || closed.has(day)
              const intensity = isClosed ? 0 : (cell?.intensity ?? 0)
              const t = intensity / max
              const colW = chartW / columns
              const x = 52 + (slotMode ? hour * colW : (hour / 24) * chartW)
              const y = 18 + day * rowH
              const w = colW - 1
              const fill = isClosed
                ? `color-mix(in srgb, ${colors.muted} 80%, transparent)`
                : `color-mix(in srgb, ${colors.primary} ${Math.round(t * 85 + 10)}%, ${colors.muted})`
              const tipLabel = slotMode
                ? `${dayLabel} ${slotLabels?.[hour] ?? hour} — ${isClosed ? 'closed' : `intensity ${intensity}`}`
                : `${dayLabel} ${hour}:00 — intensity ${intensity}`
              return (
                <rect
                  key={`${day}-${hour}`}
                  x={x}
                  y={y}
                  width={w}
                  height={14}
                  rx={3}
                  fill={fill}
                  className={cn('outline-none', isClosed && 'opacity-50')}
                  onMouseEnter={() => setTip(tipLabel)}
                  onMouseLeave={() => setTip(null)}
                  onFocus={() => setTip(tipLabel)}
                  onBlur={() => setTip(null)}
                  tabIndex={0}
                />
              )
            }),
          )}
        </svg>
      </div>
    </ChartA11yFrame>
  )
}
