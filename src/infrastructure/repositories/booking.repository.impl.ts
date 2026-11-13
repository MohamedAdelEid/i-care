import type {
  BookingInput,
  BookingListFilters,
  IBookingRepository,
} from '@/domain/repositories/booking.repository'
import type { Booking, BookingTimeSlot } from '@/domain/entities'
import type { PaginatedRequest } from '@/domain/types'
import { bookingSource } from '@/infrastructure/data/sources/booking.source'

export class BookingRepository implements IBookingRepository {
  list(request: PaginatedRequest, filters?: BookingListFilters) {
    return bookingSource.list(request, filters)
  }

  listForWeek(weekStartIso: string) {
    return bookingSource.listForWeek(weekStartIso)
  }

  getById(id: string) {
    return bookingSource.getById(id)
  }

  getStats() {
    return bookingSource.getStats()
  }

  getTabCounts(filters?: Omit<BookingListFilters, 'status'>) {
    return bookingSource.getTabCounts(filters)
  }

  listDoctors() {
    return bookingSource.listDoctors()
  }

  create(input: BookingInput) {
    return bookingSource.create(input)
  }

  update(id: string, patch: Partial<Booking>) {
    return bookingSource.update(id, patch)
  }

  confirm(id: string) {
    return bookingSource.confirm(id)
  }

  cancel(id: string) {
    return bookingSource.cancel(id)
  }

  sendReminder(id: string) {
    return bookingSource.sendReminder(id)
  }

  reschedule(id: string, day: string, timeSlot: BookingTimeSlot) {
    return bookingSource.reschedule(id, day, timeSlot)
  }

  delete(id: string) {
    return bookingSource.delete(id)
  }

  estimateCost(serviceId: string, degree: string) {
    return bookingSource.estimateCost(serviceId, degree)
  }
}
