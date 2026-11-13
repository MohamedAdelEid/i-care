import { useState } from 'react'

import { useAsync } from '@/application/hooks/use-async'
import { repositories } from '@/composition/repositories'
import type { BookingListFilters } from '@/domain/repositories/booking.repository'

export const useBookings = (filters: BookingListFilters, pageSize = 20) => {
  const [page, setPage] = useState(1)
  const filterKey = JSON.stringify(filters)
  const query = useAsync(
    () => repositories.bookings.list({ page, pageSize }, filters),
    [page, pageSize, filterKey],
  )
  return { ...query, page, pageSize, setPage }
}

export const useBookingStats = () => useAsync(() => repositories.bookings.getStats(), [])

export const useBookingTabCounts = (filters: Omit<BookingListFilters, 'status'> = {}) => {
  const filterKey = JSON.stringify(filters)
  return useAsync(() => repositories.bookings.getTabCounts(filters), [filterKey])
}

export const useBooking = (id: string | undefined) =>
  useAsync(() => (id ? repositories.bookings.getById(id) : Promise.resolve(null)), [id])

export const useBookingsWeek = (weekStartIso: string) =>
  useAsync(() => repositories.bookings.listForWeek(weekStartIso), [weekStartIso])

export const useDoctors = () => useAsync(() => repositories.bookings.listDoctors(), [])
