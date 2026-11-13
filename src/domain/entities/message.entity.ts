import type { MessageMetadata } from '@/domain/entities/inbox.entity'
import type { MessageDirection, SenderType } from '@/domain/enums'

export interface Message {
  id: string
  conversationId: string
  direction: MessageDirection
  senderType: SenderType
  body: string
  sentAt: string
  metadata?: MessageMetadata
}
