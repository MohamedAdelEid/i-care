import type {
  AiInsight,
  BookingDraft,
  Conversation,
  InboxTabCounts,
} from '@/domain/entities'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'

export interface ConversationListFilters {
  status?: string
  handler?: string
  channel?: string
  search?: string
  serviceId?: string
  assigneeId?: string
  unreadOnly?: boolean
  from?: string
  to?: string
  /** Inbox tab shortcut: all | ai | waiting | human | resolved */
  tab?: string
}

export interface IConversationRepository {
  list(
    request: PaginatedRequest,
    filters?: ConversationListFilters,
  ): Promise<PaginatedResult<Conversation>>
  getTabCounts(filters?: Omit<ConversationListFilters, 'tab' | 'status' | 'handler'>): Promise<InboxTabCounts>
  getById(id: string): Promise<Conversation | null>
  update(id: string, patch: Partial<Conversation>): Promise<Conversation>
  takeOver(id: string, assigneeUserId?: string, assigneeName?: string): Promise<Conversation>
  handBackToAi(id: string): Promise<Conversation>
  resolve(id: string): Promise<Conversation>
  assign(id: string, assigneeUserId: string, assigneeName: string): Promise<Conversation>
  addTags(id: string, tags: string[]): Promise<Conversation>
  transferToDepartment(id: string, department: string): Promise<Conversation>
  markRead(id: string): Promise<Conversation>
  getBookingDraft(conversationId: string): Promise<BookingDraft | null>
  getAiInsight(conversationId: string): Promise<AiInsight | null>
  updateBookingDraft(
    conversationId: string,
    patch: Partial<BookingDraft>,
  ): Promise<BookingDraft>
}
