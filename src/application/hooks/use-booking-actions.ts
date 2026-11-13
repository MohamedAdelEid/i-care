import { useCallback } from 'react'

import { repositories } from '@/composition/repositories'
import type { Booking, BookingTimeSlot } from '@/domain/entities'
import type { BookingInput } from '@/domain/repositories/booking.repository'

export const useBookingActions = () => {
  const create = useCallback((input: BookingInput) => repositories.bookings.create(input), [])
  const update = useCallback(
    (id: string, patch: Partial<Booking>) => repositories.bookings.update(id, patch),
    [],
  )
  const confirm = useCallback((id: string) => repositories.bookings.confirm(id), [])
  const cancel = useCallback((id: string) => repositories.bookings.cancel(id), [])
  const sendReminder = useCallback((id: string) => repositories.bookings.sendReminder(id), [])
  const reschedule = useCallback(
    (id: string, day: string, timeSlot: BookingTimeSlot) =>
      repositories.bookings.reschedule(id, day, timeSlot),
    [],
  )
  const remove = useCallback((id: string) => repositories.bookings.delete(id), [])
  const estimateCost = useCallback(
    (serviceId: string, degree: string) => repositories.bookings.estimateCost(serviceId, degree),
    [],
  )

  const bulkConfirm = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map((id) => repositories.bookings.confirm(id)))
  }, [])

  const bulkCancel = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map((id) => repositories.bookings.cancel(id)))
  }, [])

  const bulkRemind = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map((id) => repositories.bookings.sendReminder(id)))
  }, [])

  return {
    create,
    update,
    confirm,
    cancel,
    sendReminder,
    reschedule,
    remove,
    estimateCost,
    bulkConfirm,
    bulkCancel,
    bulkRemind,
  }
}
