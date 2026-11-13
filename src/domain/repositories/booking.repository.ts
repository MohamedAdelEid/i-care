import type {
  Booking,
  BookingStats,
  BookingStatus,
  BookingTabCounts,
  BookingTimeSlot,
  Doctor,
} from '@/domain/entities'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'

export interface BookingListFilters {
  status?: BookingStatus | 'all'
  serviceId?: string
  doctorDegree?: string
  doctorId?: string
  timeSlot?: BookingTimeSlot
  channel?: string
  from?: string
  to?: string
  search?: string
  weekStart?: string
}

export type BookingInput = Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'doctorName'> & {
  id?: string
}

export interface IBookingRepository {
  list(
    request: PaginatedRequest,
    filters?: BookingListFilters,
  ): Promise<PaginatedResult<Booking>>
  listForWeek(weekStartIso: string): Promise<Booking[]>
  getById(id: string): Promise<Booking | null>
  getStats(): Promise<BookingStats>
  getTabCounts(filters?: Omit<BookingListFilters, 'status'>): Promise<BookingTabCounts>
  listDoctors(): Promise<Doctor[]>
  create(input: BookingInput): Promise<Booking>
  update(id: string, patch: Partial<Booking>): Promise<Booking>
  confirm(id: string): Promise<Booking>
  cancel(id: string): Promise<Booking>
  sendReminder(id: string): Promise<Booking>
  reschedule(id: string, day: string, timeSlot: BookingTimeSlot): Promise<Booking>
  delete(id: string): Promise<void>
  estimateCost(serviceId: string, degree: string): Promise<number>
}
