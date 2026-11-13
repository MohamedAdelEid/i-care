import type { MessageMetadata } from '@/domain/entities'
import type { IMessageRepository } from '@/domain/repositories/message.repository'
import { messageSource } from '@/infrastructure/data/sources/message.source'

export class MessageRepository implements IMessageRepository {
  listByConversation(conversationId: string) {
    return messageSource.listByConversation(conversationId)
  }

  append(
    conversationId: string,
    body: string,
    senderType: Parameters<IMessageRepository['append']>[2],
    metadata?: MessageMetadata,
  ) {
    return messageSource.append(conversationId, body, senderType, metadata)
  }
}
