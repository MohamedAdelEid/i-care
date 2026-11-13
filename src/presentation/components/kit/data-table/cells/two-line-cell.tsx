import { cn } from '@/presentation/utils'

export interface KitTwoLineCellProps {
  primary: string
  secondary?: string
  className?: string
}

export const KitTwoLineCell = ({ primary, secondary, className }: KitTwoLineCellProps) => (
  <div className={cn('min-w-0', className)}>
    <p className="truncate text-sm text-foreground">{primary}</p>
    {secondary ? <p className="truncate text-xs text-muted-foreground">{secondary}</p> : null}
  </div>
)
