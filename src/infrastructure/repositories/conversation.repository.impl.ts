import type {
  ConversationListFilters,
  IConversationRepository,
} from '@/domain/repositories/conversation.repository'
import type { BookingDraft } from '@/domain/entities'
import type { PaginatedRequest } from '@/domain/types'
import { conversationSource } from '@/infrastructure/data/sources/conversation.source'

export class ConversationRepository implements IConversationRepository {
  list(request: PaginatedRequest, filters?: ConversationListFilters) {
    return conversationSource.list(request, filters)
  }

  getTabCounts(filters?: Omit<ConversationListFilters, 'tab' | 'status' | 'handler'>) {
    return conversationSource.getTabCounts(filters)
  }

  getById(id: string) {
    return conversationSource.getById(id)
  }

  update(id: string, patch: Parameters<typeof conversationSource.update>[1]) {
    return conversationSource.update(id, patch)
  }

  takeOver(id: string, assigneeUserId?: string, assigneeName?: string) {
    return conversationSource.takeOver(id, assigneeUserId, assigneeName)
  }

  handBackToAi(id: string) {
    return conversationSource.handBackToAi(id)
  }

  resolve(id: string) {
    return conversationSource.resolve(id)
  }

  assign(id: string, assigneeUserId: string, assigneeName: string) {
    return conversationSource.assign(id, assigneeUserId, assigneeName)
  }

  addTags(id: string, tags: string[]) {
    return conversationSource.addTags(id, tags)
  }

  transferToDepartment(id: string, department: string) {
    return conversationSource.transferToDepartment(id, department)
  }

  markRead(id: string) {
    return conversationSource.markRead(id)
  }

  getBookingDraft(conversationId: string) {
    return conversationSource.getBookingDraft(conversationId)
  }

  getAiInsight(conversationId: string) {
    return conversationSource.getAiInsight(conversationId)
  }

  updateBookingDraft(conversationId: string, patch: Partial<BookingDraft>) {
    return conversationSource.updateBookingDraft(conversationId, patch)
  }
}
