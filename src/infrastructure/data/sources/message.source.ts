import type { Message, MessageMetadata } from '@/domain/entities'
import { SenderType } from '@/domain/enums'
import { appendMessage, memoryStore, upsertConversation } from '@/infrastructure/data/memory-store'
import { delay } from '@/infrastructure/data/utils/source.utils'

export const messageSource = {
  async listByConversation(conversationId: string): Promise<Message[]> {
    await delay()
    return memoryStore.messages
      .filter((item) => item.conversationId === conversationId)
      .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())
  },

  async append(
    conversationId: string,
    body: string,
    senderType: Message['senderType'],
    metadata?: MessageMetadata,
  ): Promise<Message> {
    await delay()
    const message: Message = {
      id: `msg-${conversationId}-${Date.now()}`,
      conversationId,
      direction: senderType === SenderType.Customer ? 'inbound' : 'outbound',
      senderType,
      body,
      sentAt: new Date().toISOString(),
      metadata: metadata ?? { kind: 'text' },
    }
    appendMessage(message)
    const conversation = memoryStore.conversations.find((item) => item.id === conversationId)
    if (conversation) {
      upsertConversation({
        ...conversation,
        lastMessageAt: message.sentAt,
        lastMessagePreview: body.slice(0, 120),
      })
    }
    return message
  },
}
