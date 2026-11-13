import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'

import { Button } from '@/presentation/components/ui/button'
import { Calendar } from '@/presentation/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/presentation/components/ui/popover'
import { cn } from '@/presentation/utils'
import { useTranslation } from '@/presentation/hooks/use-translation'

export interface KitDateRangePickerProps {
  from?: Date
  to?: Date
  onChange?: (range: { from?: Date; to?: Date }) => void
  className?: string
}

export const KitDateRangePicker = ({ from, to, onChange, className }: KitDateRangePickerProps) => {
  const { t } = useTranslation('kit')
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState<DateRange | undefined>({ from, to })

  const label =
    range?.from && range.to
      ? `${format(range.from, 'LLL d, y')} – ${format(range.to, 'LLL d, y')}`
      : range?.from
        ? format(range.from, 'LLL d, y')
        : t('dateRange')

  const apply = () => {
    onChange?.({ from: range?.from, to: range?.to })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn('justify-start gap-2 font-normal', className)}
        >
          <CalendarIcon className="size-4 text-muted-foreground" />
          <span className="truncate">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <Calendar
          mode="range"
          selected={range}
          onSelect={(next) => setRange(next)}
          numberOfMonths={2}
        />
        <div className="mt-3 flex justify-end gap-2 border-t border-border pt-3">
          <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
            {t('cancel')}
          </Button>
          <Button type="button" size="sm" onClick={apply}>
            {t('apply')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
