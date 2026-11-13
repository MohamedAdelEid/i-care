interface BarChartItem {
  label: string
  value: number
}

interface BarChartProps {
  items: BarChartItem[]
  label?: string
}

export const BarChart = ({ items, label }: BarChartProps) => {
  const max = Math.max(...items.map((item) => item.value), 1)
  return (
    <div className="space-y-3" role="img" aria-label={label}>
      {label ? <span className="sr-only">{label}</span> : null}
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[8rem_1fr_auto] items-center gap-3 text-sm">
          <span className="text-muted-foreground">{item.label}</span>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
          <span className="font-medium tabular-nums">{item.value}</span>
        </div>
      ))}
    </div>
  )
}
