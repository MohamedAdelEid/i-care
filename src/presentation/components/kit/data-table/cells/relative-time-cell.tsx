import { format, formatDistanceToNow } from 'date-fns'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/presentation/components/ui/tooltip'
import { cn } from '@/presentation/utils'

export interface KitRelativeTimeCellProps {
  date: Date | string | number
  className?: string
}

export const KitRelativeTimeCell = ({ date, className }: KitRelativeTimeCellProps) => {
  const value = date instanceof Date ? date : new Date(date)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <time
          dateTime={value.toISOString()}
          className={cn('text-sm text-muted-foreground tabular-nums', className)}
        >
          {formatDistanceToNow(value, { addSuffix: true })}
        </time>
      </TooltipTrigger>
      <TooltipContent>
        <span className="text-xs tabular-nums">{format(value, 'PPpp')}</span>
      </TooltipContent>
    </Tooltip>
  )
}
