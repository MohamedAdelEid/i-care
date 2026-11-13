import type {
  Booking,
  BookingStats,
  BookingStatus,
  BookingTabCounts,
  BookingTimeSlot,
  Doctor,
} from '@/domain/entities'
import type {
  BookingInput,
  BookingListFilters,
} from '@/domain/repositories/booking.repository'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'
import { memoryStore } from '@/infrastructure/data/memory-store'
import { delay, filterBySearch, paginate } from '@/infrastructure/data/utils/source.utils'

const upsertBooking = (booking: Booking) => {
  const index = memoryStore.bookings.findIndex((item) => item.id === booking.id)
  if (index >= 0) memoryStore.bookings[index] = booking
  else memoryStore.bookings.unshift(booking)
}

const applyFilters = (filters?: BookingListFilters) => {
  let items = [...memoryStore.bookings]
  if (filters?.status && filters.status !== 'all') {
    items = items.filter((item) => item.status === filters.status)
  }
  if (filters?.serviceId) items = items.filter((item) => item.serviceId === filters.serviceId)
  if (filters?.doctorDegree) {
    items = items.filter((item) => item.doctorDegree === filters.doctorDegree)
  }
  if (filters?.doctorId) items = items.filter((item) => item.doctorId === filters.doctorId)
  if (filters?.timeSlot) items = items.filter((item) => item.timeSlot === filters.timeSlot)
  if (filters?.channel) items = items.filter((item) => item.channel === filters.channel)
  if (filters?.from) {
    const from = filters.from
    items = items.filter((item) => item.day >= from)
  }
  if (filters?.to) {
    const to = filters.to
    items = items.filter((item) => item.day <= to)
  }
  if (filters?.weekStart) {
    const start = new Date(filters.weekStart)
    const end = new Date(start)
    end.setUTCDate(start.getUTCDate() + 6)
    const from = start.toISOString().slice(0, 10)
    const to = end.toISOString().slice(0, 10)
    items = items.filter((item) => item.day >= from && item.day <= to)
  }
  items = filterBySearch(items, filters?.search, ['patientName', 'phone', 'id', 'doctorName'])
  return items.sort((a, b) => b.day.localeCompare(a.day) || a.timeSlot.localeCompare(b.timeSlot))
}

export const bookingSource = {
  async list(
    request: PaginatedRequest,
    filters?: BookingListFilters,
  ): Promise<PaginatedResult<Booking>> {
    await delay()
    return paginate(applyFilters(filters), request)
  },

  async listForWeek(weekStartIso: string): Promise<Booking[]> {
    await delay(120)
    return applyFilters({ weekStart: weekStartIso }).filter(
      (item) => item.status !== 'cancelled',
    )
  },

  async getById(id: string): Promise<Booking | null> {
    await delay()
    return memoryStore.bookings.find((item) => item.id === id) ?? null
  },

  async getStats(): Promise<BookingStats> {
    await delay(80)
    const items = memoryStore.bookings
    const today = new Date().toISOString().slice(0, 10)
    const weekStart = new Date()
    weekStart.setUTCDate(weekStart.getUTCDate() - weekStart.getUTCDay())
    const weekFrom = weekStart.toISOString().slice(0, 10)
    return {
      today: items.filter((i) => i.day === today).length,
      thisWeek: items.filter((i) => i.day >= weekFrom).length,
      pendingConfirmation: items.filter((i) => i.status === 'pending_confirmation').length,
      confirmed: items.filter((i) => i.status === 'confirmed').length,
      cancelled: items.filter((i) => i.status === 'cancelled').length,
    }
  },

  async getTabCounts(
    filters?: Omit<BookingListFilters, 'status'>,
  ): Promise<BookingTabCounts> {
    await delay(60)
    const base = applyFilters({ ...filters, status: 'all' })
    const count = (status: BookingStatus) => base.filter((i) => i.status === status).length
    return {
      all: base.length,
      draft_ai: count('draft_ai'),
      pending_confirmation: count('pending_confirmation'),
      confirmed: count('confirmed'),
      cancelled: count('cancelled'),
      no_show: count('no_show'),
    }
  },

  async listDoctors(): Promise<Doctor[]> {
    await delay(40)
    return [...memoryStore.doctors]
  },

  async create(input: BookingInput): Promise<Booking> {
    await delay()
    const doctor = memoryStore.doctors.find((d) => d.id === input.doctorId)
    const now = new Date().toISOString()
    const booking: Booking = {
      id: input.id ?? `bk-${Date.now()}`,
      patientName: input.patientName,
      phone: input.phone,
      serviceId: input.serviceId,
      doctorId: input.doctorId,
      doctorName: doctor?.name ?? 'Doctor',
      doctorDegree: input.doctorDegree,
      day: input.day,
      timeSlot: input.timeSlot,
      cost: input.cost,
      channel: input.channel,
      attachmentCount: input.attachmentCount ?? 0,
      attachments: input.attachments,
      status: input.status,
      conversationId: input.conversationId,
      createdAt: now,
      updatedAt: now,
    }
    upsertBooking(booking)
    return booking
  },

  async update(id: string, patch: Partial<Booking>): Promise<Booking> {
    await delay()
    const current = memoryStore.bookings.find((item) => item.id === id)
    if (!current) throw new Error('Booking not found')
    const doctor =
      patch.doctorId != null
        ? memoryStore.doctors.find((d) => d.id === patch.doctorId)
        : undefined
    const next = {
      ...current,
      ...patch,
      doctorName: doctor?.name ?? patch.doctorName ?? current.doctorName,
      updatedAt: new Date().toISOString(),
    }
    upsertBooking(next)
    return next
  },

  async confirm(id: string) {
    return bookingSource.update(id, { status: 'confirmed' })
  },

  async cancel(id: string) {
    return bookingSource.update(id, { status: 'cancelled' })
  },

  async sendReminder(id: string) {
    await delay(100)
    const current = memoryStore.bookings.find((item) => item.id === id)
    if (!current) throw new Error('Booking not found')
    return current
  },

  async reschedule(id: string, day: string, timeSlot: BookingTimeSlot) {
    return bookingSource.update(id, { day, timeSlot })
  },

  async delete(id: string) {
    await delay()
    memoryStore.bookings = memoryStore.bookings.filter((item) => item.id !== id)
  },

  async estimateCost(serviceId: string, degree: string) {
    await delay(40)
    const service = memoryStore.clinicServices.find((item) => item.id === serviceId)
    return service?.prices[degree as keyof typeof service.prices] ?? 500
  },
}
