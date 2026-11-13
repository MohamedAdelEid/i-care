import type { ChannelType, ConversationStatus, Language } from '@/domain/enums'
import type { EyeCareServiceId } from '@/domain/entities/inbox.entity'
import type { BookingStatus, BookingTimeSlot } from '@/domain/entities/booking.entity'

export type CustomerStatus = 'active' | 'inactive' | 'blocked'

export type CustomerListTab = 'all' | 'new' | 'returning' | 'insurance' | 'flagged'

export interface CustomerChannelIdentity {
  channelType: ChannelType
  externalId: string
}

export interface CustomerNote {
  id: string
  body: string
  pinned: boolean
  createdAt: string
  updatedAt: string
}

export type CustomerAttachmentKind = 'prescription' | 'card' | 'receipt'

export interface CustomerAttachment {
  id: string
  kind: CustomerAttachmentKind
  label: string
  url: string
  createdAt: string
}

export interface CustomerActivityEvent {
  id: string
  type: 'conversation' | 'booking' | 'note' | 'tag' | 'status'
  title: string
  at: string
}

export interface CustomerAiProfile {
  preferences: string
  frequentDoctorName?: string
  language: Language
  lastIntent?: string
}

export interface Customer {
  id: string
  displayName: string
  phone: string
  email?: string
  preferredLanguage: Language
  tags: string[]
  createdAt: string
  lastSeenAt: string
  channels: CustomerChannelIdentity[]
  status: CustomerStatus
  /** 0–5 CSAT */
  satisfaction: number
  hasInsurance: boolean
  lastServiceId?: EyeCareServiceId
  totalBookings: number
  totalConversations: number
  flagged?: boolean
  notes: CustomerNote[]
  attachments: CustomerAttachment[]
  activity: CustomerActivityEvent[]
  aiProfile: CustomerAiProfile
}

export interface CustomerConversationSummary {
  id: string
  subject: string
  channelType: ChannelType
  status: ConversationStatus
  lastMessageAt: string
}

export interface CustomerBookingSummary {
  id: string
  day: string
  timeSlot: BookingTimeSlot
  serviceId: EyeCareServiceId
  status: BookingStatus
  doctorName: string
}

export interface CustomerProfile extends Customer {
  conversations: CustomerConversationSummary[]
  bookings: CustomerBookingSummary[]
}

export interface CustomerStats {
  total: number
  newThisMonth: number
  activeThisWeek: number
  withInsurance: number
  avgCsat: number
}

export type CustomerTabCounts = Record<CustomerListTab, number>
