import type { EyeCareServiceId, MessageAttachmentType } from '@/domain/entities/inbox.entity'
import type { ChannelType } from '@/domain/enums'

export type DoctorDegree = 'professor' | 'consultant' | 'specialist'

export type BookingTimeSlot = '09-12' | '12-15' | '15-18' | '18-21'

export type BookingStatus =
  | 'draft_ai'
  | 'pending_confirmation'
  | 'confirmed'
  | 'cancelled'
  | 'no_show'

export type BookingChannel = ChannelType | 'manual'

export type BookingAttachment = {
  id: string
  type: MessageAttachmentType
  fileName: string
  url: string
}

export type DoctorStatus = 'active' | 'inactive'

/** Keys "0"–"6" (0=Sat … 6=Fri). Friday always empty/locked. */
export type DoctorSlotGrid = Record<string, BookingTimeSlot[]>

export type Doctor = {
  id: string
  name: string
  degree: DoctorDegree
  services: EyeCareServiceId[]
  /** 0=Sat … 6=Fri; Friday typically empty. Derived from slotGrid when present. */
  availableDays: number[]
  specialty: string
  status: DoctorStatus
  consultationPrice: number
  slotGrid: DoctorSlotGrid
  bookingsCount: number
}

export type Booking = {
  id: string
  patientName: string
  phone: string
  serviceId: EyeCareServiceId
  doctorId: string
  doctorName: string
  doctorDegree: DoctorDegree
  day: string
  timeSlot: BookingTimeSlot
  cost: number
  channel: BookingChannel
  attachmentCount: number
  attachments?: BookingAttachment[]
  status: BookingStatus
  conversationId?: string
  createdAt: string
  updatedAt: string
}

export type BookingStats = {
  today: number
  thisWeek: number
  pendingConfirmation: number
  confirmed: number
  cancelled: number
}

export type BookingTabCounts = Record<BookingStatus | 'all', number>
