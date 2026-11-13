import type {
  BookingTimeSlot,
  Doctor,
  DoctorDegree,
  DoctorStatus,
} from '@/domain/entities/booking.entity'
import type { EyeCareServiceId, MessageAttachmentType } from '@/domain/entities/inbox.entity'
import type { HandoffDepartment } from '@/domain/entities/analytics.entity'
import type { BusinessHours } from '@/domain/entities/settings.entity'

export type ClinicAttachmentRule = {
  type: Extract<MessageAttachmentType, 'prescription' | 'insurance_card' | 'receipt'>
  required: boolean
  optional: boolean
}

export type ClinicService = {
  id: EyeCareServiceId
  nameKey: string
  active: boolean
  prices: Record<DoctorDegree, number>
  attachments: ClinicAttachmentRule[]
}

export type ClinicDepartmentMember = {
  id: string
  name: string
  role: string
}

export type ClinicDepartment = {
  id: HandoffDepartment
  name: string
  members: ClinicDepartmentMember[]
  workingHours: string
  handoffRules: string[]
}

export type ClinicHoliday = {
  id: string
  date: string
  label: string
}

export type ClinicException = {
  id: string
  date: string
  closed: boolean
  open?: string
  close?: string
  label?: string
}

export type ClinicSchedule = {
  timezone: string
  weekly: BusinessHours['slots']
  holidays: ClinicHoliday[]
  exceptions: ClinicException[]
  /** Editable labels for the four clinic-wide buckets */
  timeSlots: { id: BookingTimeSlot; label: string }[]
}

export type DoctorStats = {
  total: number
  active: number
  professors: number
  avgPrice: number
}

export type DoctorListFilters = {
  degree?: DoctorDegree | 'all'
  status?: DoctorStatus | 'all'
  serviceId?: EyeCareServiceId | 'all'
  search?: string
}

export type { Doctor }
