import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { useBookingActions, useBookingsWeek } from '@/application/hooks'
import type { Booking, BookingTimeSlot, EyeCareServiceId } from '@/domain/entities'
import { notify } from '@/infrastructure/libs/toast/toast'
import { KitPageHeader } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { cn } from '@/presentation/utils'

import { BookingDrawer } from '../booking-drawer'

const SLOTS: BookingTimeSlot[] = ['09-12', '12-15', '15-18', '18-21']

/** Week starting Saturday. */
const startOfWeekSat = (date: Date) => {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const day = d.getUTCDay() // 0 Sun … 6 Sat
  const diff = day === 6 ? 0 : day + 1
  d.setUTCDate(d.getUTCDate() - diff)
  return d
}

const addDays = (date: Date, n: number) => {
  const d = new Date(date)
  d.setUTCDate(d.getUTCDate() + n)
  return d
}

const isoDay = (date: Date) => date.toISOString().slice(0, 10)

const serviceColor: Record<EyeCareServiceId, string> = {
  retina: 'bg-primary/20 border-primary/40 text-primary',
  lasik: 'bg-ai-soft border-ai/30 text-ai',
  pediatric: 'bg-success/15 border-success/30 text-success',
  optics: 'bg-warning/15 border-warning/30 text-warning',
  cataract: 'bg-muted border-border text-foreground',
}

export const BookingsCalendarPage = () => {
  const { t } = useTranslation('bookings')
  const [anchor, setAnchor] = useState(() => startOfWeekSat(new Date()))
  const [active, setActive] = useState<Booking | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dragId, setDragId] = useState<string | null>(null)

  const weekStartIso = isoDay(anchor)
  const week = useBookingsWeek(weekStartIso)
  const actions = useBookingActions()

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(anchor, i)), [anchor])

  const dayLabels = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

  const bookingsByCell = useMemo(() => {
    const map = new Map<string, Booking[]>()
    for (const booking of week.data ?? []) {
      const key = `${booking.day}|${booking.timeSlot}`
      const list = map.get(key) ?? []
      list.push(booking)
      map.set(key, list)
    }
    return map
  }, [week.data])

  const onDrop = async (day: string, slot: BookingTimeSlot) => {
    if (!dragId) return
    const dayDate = new Date(`${day}T12:00:00`)
    if (dayDate.getDay() === 5) {
      notify.error({ title: t('fridayClosed') })
      setDragId(null)
      return
    }
    await actions.reschedule(dragId, day, slot)
    notify.success({ title: t('rescheduleSuccess') })
    week.refetch()
    setDragId(null)
  }

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader
        title={t('calendarTitle')}
        description={t('calendarDescription')}
        primaryActions={
          <Button type="button" variant="outline" asChild>
            <Link to={ROUTES.BOOKINGS.LIST}>{t('listNav')}</Link>
          </Button>
        }
        secondaryActions={
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              onClick={() => setAnchor((d) => addDays(d, -7))}
              aria-label={t('prevWeek')}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm tabular-nums">
              {isoDay(days[0]!)} – {isoDay(days[6]!)}
            </span>
            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              onClick={() => setAnchor((d) => addDays(d, 7))}
              aria-label={t('nextWeek')}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        }
      />

      <div className="overflow-x-auto rounded-card border border-border bg-card shadow-elevation-sm">
        <div className="grid min-w-[900px] grid-cols-[88px_repeat(7,minmax(0,1fr))]">
          <div className="border-b border-border p-2" />
          {days.map((day, i) => {
            const friday = day.getUTCDay() === 5
            return (
              <div
                key={isoDay(day)}
                className={cn(
                  'border-b border-s border-border p-2 text-center text-xs font-medium',
                  friday && 'bg-muted/50 text-muted-foreground',
                )}
              >
                <div>{dayLabels[i]}</div>
                <div className="tabular-nums">{isoDay(day).slice(5)}</div>
                {friday ? <div className="mt-1 text-[10px]">{t('fridayClosed')}</div> : null}
              </div>
            )
          })}

          {SLOTS.map((slot) => (
            <div key={slot} className="contents">
              <div className="border-b border-border p-2 text-xs text-muted-foreground">{slot}</div>
              {days.map((day) => {
                const dayIso = isoDay(day)
                const friday = day.getUTCDay() === 5
                const key = `${dayIso}|${slot}`
                const cellBookings = bookingsByCell.get(key) ?? []
                return (
                  <div
                    key={key}
                    className={cn(
                      'min-h-20 border-b border-s border-border p-1',
                      friday && 'bg-muted/40',
                    )}
                    onDragOver={(event) => {
                      if (!friday) event.preventDefault()
                    }}
                    onDrop={() => void onDrop(dayIso, slot)}
                  >
                    {friday ? null : (
                      <div className="flex flex-col gap-1">
                        {cellBookings.map((booking) => (
                          <button
                            key={booking.id}
                            type="button"
                            draggable
                            onDragStart={() => setDragId(booking.id)}
                            onDragEnd={() => setDragId(null)}
                            onClick={() => {
                              setActive(booking)
                              setDrawerOpen(true)
                            }}
                            className={cn(
                              'rounded-control border px-1.5 py-1 text-start text-[10px] leading-tight',
                              serviceColor[booking.serviceId],
                              dragId === booking.id && 'opacity-60',
                            )}
                          >
                            <div className="truncate font-medium">{booking.patientName}</div>
                            <div className="truncate opacity-80">{booking.doctorName}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <BookingDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        booking={active}
        onSaved={() => week.refetch()}
      />
    </div>
  )
}
