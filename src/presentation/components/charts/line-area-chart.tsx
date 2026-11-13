interface LineAreaChartProps {
  series: number[]
  className?: string
  label?: string
}

export const LineAreaChart = ({ series, className, label }: LineAreaChartProps) => {
  if (!series.length) return null
  const width = 320
  const height = 120
  const max = Math.max(...series, 1)
  const step = width / Math.max(series.length - 1, 1)

  const points = series
    .map((value, index) => {
      const x = index * step
      const y = height - (value / max) * (height - 8) - 4
      return `${x},${y}`
    })
    .join(' ')

  const area = `0,${height} ${points} ${width},${height}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={label}
    >
      {label ? <title>{label}</title> : null}
      <polygon points={area} fill="var(--primary)" opacity="0.12" />
      <polyline
        points={points}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
