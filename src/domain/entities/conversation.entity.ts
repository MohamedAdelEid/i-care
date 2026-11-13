import type { EyeCareServiceId } from '@/domain/entities/inbox.entity'
import type { ChannelType, ConversationHandler, ConversationStatus } from '@/domain/enums'

export type SlaTone = 'ok' | 'warning' | 'critical'

export interface Conversation {
  id: string
  customerId: string
  channelType: ChannelType
  status: ConversationStatus
  handler: ConversationHandler
  assignedUserId?: string
  agentId?: string
  subject?: string
  lastMessageAt: string
  unreadCount: number
  escalationId?: string
  lastMessagePreview?: string
  customerName?: string
  aiReasoning?: string
  /** Eye-care service line for filters / chips. */
  serviceId?: EyeCareServiceId
  tags?: string[]
  slaDueAt?: string
  slaTone?: SlaTone
  assigneeName?: string
  isTyping?: boolean
  locale?: 'en' | 'ar'
  transferDepartment?: string
}
