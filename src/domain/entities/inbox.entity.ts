import type { HandoffDepartment } from '@/domain/entities/analytics.entity'

export type EyeCareServiceId = 'retina' | 'lasik' | 'pediatric' | 'optics' | 'cataract'

export type MessageAttachmentType = 'prescription' | 'insurance_card' | 'receipt' | 'other'

export type MessageMetadataKind = 'text' | 'system' | 'attachment'

export type MessageMetadata = {
  kind?: MessageMetadataKind
  attachmentType?: MessageAttachmentType
  url?: string
  fileName?: string
  mimeType?: string
}

export type BookingConfirmationState =
  | 'collecting'
  | 'awaiting_confirm'
  | 'confirmed'
  | 'editing'

export type BookingDraft = {
  conversationId: string
  fourPartName?: string
  phone?: string
  serviceId?: EyeCareServiceId
  doctorDegree?: string
  day?: string
  timeSlot?: string
  estimatedCost?: string
  attachmentCount?: number
  stepIndex: number
  stepTotal: number
  confirmationState: BookingConfirmationState
}

export type AiInsight = {
  conversationId: string
  intent: string
  confidence: number
  reasoningSummary: string
  toolsUsed: string[]
  handoffReason?: string
  handoffDepartment?: HandoffDepartment
}

export type InboxTabId = 'all' | 'ai' | 'waiting' | 'human' | 'resolved'

export type InboxTabCounts = Record<InboxTabId, number>

export type ConversationDetail = {
  conversationId: string
  bookingDraft: BookingDraft | null
  aiInsight: AiInsight | null
}
