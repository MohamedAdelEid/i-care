import type { HandoffDepartment } from '@/domain/entities/analytics.entity'
import type { SlaTone } from '@/domain/entities/conversation.entity'
import type { EyeCareServiceId } from '@/domain/entities/inbox.entity'
import type { EscalationPriority, EscalationStatus } from '@/domain/enums'

export type HandoffTimelineEvent = {
  id: string
  at: string
  label: string
}

export type HandoffNote = {
  id: string
  at: string
  author: string
  body: string
}

/** Escalation / handoff case for department queues. */
export interface Escalation {
  id: string
  conversationId: string
  reason: string
  priority: EscalationPriority
  status: EscalationStatus
  assignedUserId?: string
  openedAt: string
  resolvedAt?: string
  notes?: string
  customerName?: string
  department: HandoffDepartment
  serviceId?: EyeCareServiceId
  aiSummary: string
  aiSummaryDetail?: string
  attachmentCount: number
  slaDueAt: string
  slaTone: SlaTone
  assigneeName?: string
  patientPhone?: string
  doctorName?: string
  appointmentDay?: string
  appointmentSlot?: string
  estimatedCost?: string
  timeline?: HandoffTimelineEvent[]
  internalNotes?: HandoffNote[]
}

/** Preferred product name for escalations. */
export type Handoff = Escalation

export type HandoffStats = {
  open: number
  avgWaitMinutes: number
  slaBreached: number
  resolvedToday: number
  avgHandlingMinutes: number
}

export type HandoffTabCounts = {
  all: number
  call_center: number
  results: number
  contracts: number
}
