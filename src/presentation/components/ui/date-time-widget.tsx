import { Clock3 } from 'lucide-react'

import { LiveClock, useLiveNow } from '@/presentation/components/ui/live-clock'
import { cn } from '@/presentation/utils'

export interface DateTimeWidgetProps {
  language: string
  todayLabel: string
  ariaLabel: string
  className?: string
}

export const DateTimeWidget = ({
  language,
  todayLabel,
  ariaLabel,
  className,
}: DateTimeWidgetProps) => {
  const now = useLiveNow()

  const formattedDate = new Intl.DateTimeFormat(language, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now)

  return (
    <div
      aria-label={ariaLabel}
      className={cn(
        'relative flex w-full min-w-0 items-center gap-3 rounded-2xl border border-border/60 sm:gap-4',
        'bg-gradient-to-br from-background via-background to-muted/25 px-4 py-3.5 sm:px-5 sm:py-4',
        'pointer-events-none select-none backdrop-blur-sm xl:w-auto xl:shrink-0',
        className,
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
        <Clock3 className="size-[1.125rem]" strokeWidth={1.75} />
      </span>

      <div className="flex min-w-0 flex-col justify-center gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-primary uppercase">
            {todayLabel}
          </span>
          <span className="truncate text-sm font-medium text-foreground">{formattedDate}</span>
        </div>

        <LiveClock now={now} language={language} />
      </div>
    </div>
  )
}
