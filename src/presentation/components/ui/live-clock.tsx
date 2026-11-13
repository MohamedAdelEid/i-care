import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { cn } from '@/presentation/utils'

const FLIP_EASE = [0.32, 0.72, 0, 1] as const

export const useLiveNow = (intervalMs = 1000) => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const tick = () => setNow(new Date())
    const intervalId = window.setInterval(tick, intervalMs)

    return () => window.clearInterval(intervalId)
  }, [intervalMs])

  return now
}

interface FlipDigitProps {
  digit: string
}

const FlipDigit = ({ digit }: FlipDigitProps) => (
  <span className="relative inline-flex h-8 w-[1.05rem] items-center justify-center overflow-hidden">
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={digit}
        initial={{ y: '70%', opacity: 0, scale: 0.94 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: '-70%', opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.38, ease: FLIP_EASE }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  </span>
)

interface FlipUnitProps {
  value: number
}

const FlipUnit = ({ value }: FlipUnitProps) => {
  const padded = String(value).padStart(2, '0')

  return (
    <span className="inline-flex overflow-hidden rounded-lg bg-muted/55 ring-1 ring-border/50">
      <FlipDigit digit={padded.charAt(0)} />
      <FlipDigit digit={padded.charAt(1)} />
    </span>
  )
}

const ClockSeparator = () => (
  <span className="inline-flex h-8 w-2.5 shrink-0 items-center justify-center">
    <motion.span
      aria-hidden
      animate={{ opacity: [0.9, 0.25, 0.9] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      className="text-base leading-none font-semibold text-muted-foreground"
    >
      :
    </motion.span>
  </span>
)

export interface LiveClockProps {
  className?: string
  now?: Date
  language?: string
}

const getMeridiemLabel = (now: Date, language: string) => {
  const dayPeriod = new Intl.DateTimeFormat(language, { hour: 'numeric', hour12: true })
    .formatToParts(now)
    .find((part) => part.type === 'dayPeriod')?.value

  return dayPeriod ?? (now.getHours() < 12 ? 'AM' : 'PM')
}

export const LiveClock = ({ className, now: nowProp, language = 'en' }: LiveClockProps) => {
  const internalNow = useLiveNow()
  const now = nowProp ?? internalNow
  const hours12 = now.getHours() % 12 || 12

  return (
    <time
      dateTime={now.toISOString()}
      // Keep hours:minutes:seconds order fixed regardless of RTL layout
      dir="ltr"
      className={cn(
        'inline-flex items-center gap-1 font-mono text-base font-semibold tracking-tight text-foreground',
        className,
      )}
    >
      <FlipUnit value={hours12} />
      <ClockSeparator />
      <FlipUnit value={now.getMinutes()} />
      <ClockSeparator />
      <FlipUnit value={now.getSeconds()} />
      <span className="ms-1.5 text-xs font-semibold text-muted-foreground">
        {getMeridiemLabel(now, language)}
      </span>
    </time>
  )
}
