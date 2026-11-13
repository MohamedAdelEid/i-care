import type { Message, MessageMetadata } from '@/domain/entities'

export interface IMessageRepository {
  listByConversation(conversationId: string): Promise<Message[]>
  append(
    conversationId: string,
    body: string,
    senderType: Message['senderType'],
    metadata?: MessageMetadata,
  ): Promise<Message>
}
