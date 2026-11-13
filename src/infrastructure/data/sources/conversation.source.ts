import type { AiInsight, BookingDraft, Conversation, InboxTabCounts } from '@/domain/entities'
import { ConversationHandler, ConversationStatus } from '@/domain/enums'
import type { ConversationListFilters } from '@/domain/repositories/conversation.repository'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'
import {
  appendMessage,
  memoryStore,
  upsertBookingDraft,
  upsertConversation,
} from '@/infrastructure/data/memory-store'
import { delay, filterBySearch, paginate } from '@/infrastructure/data/utils/source.utils'

const matchesTab = (item: Conversation, tab?: string) => {
  if (!tab || tab === 'all') return true
  if (tab === 'ai') return item.handler === 'ai' || item.status === 'ai_active'
  if (tab === 'waiting') return item.status === 'waiting_human'
  if (tab === 'human') return item.handler === 'human'
  if (tab === 'resolved') return item.status === 'resolved' || item.status === 'archived'
  return true
}

const applyFilters = (filters?: ConversationListFilters) => {
  let items = [...memoryStore.conversations]
  if (filters?.tab) {
    items = items.filter((item) => matchesTab(item, filters.tab))
  } else {
    if (filters?.status && filters.status !== 'all') {
      items = items.filter((item) => item.status === filters.status)
    }
    if (filters?.handler) {
      items = items.filter((item) => item.handler === filters.handler)
    }
  }
  if (filters?.channel) {
    items = items.filter((item) => item.channelType === filters.channel)
  }
  if (filters?.serviceId) {
    items = items.filter((item) => item.serviceId === filters.serviceId)
  }
  if (filters?.assigneeId) {
    items = items.filter((item) => item.assignedUserId === filters.assigneeId)
  }
  if (filters?.unreadOnly) {
    items = items.filter((item) => item.unreadCount > 0)
  }
  if (filters?.from) {
    const from = new Date(filters.from).getTime()
    items = items.filter((item) => new Date(item.lastMessageAt).getTime() >= from)
  }
  if (filters?.to) {
    const to = new Date(filters.to).getTime()
    items = items.filter((item) => new Date(item.lastMessageAt).getTime() <= to)
  }
  items = filterBySearch(items, filters?.search, [
    'customerName',
    'subject',
    'lastMessagePreview',
    'tags',
  ])
  return items.sort(
    (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
  )
}

const pushSystem = (conversationId: string, body: string) => {
  appendMessage({
    id: `msg-${conversationId}-sys-${Date.now()}`,
    conversationId,
    direction: 'outbound',
    senderType: 'system',
    body,
    sentAt: new Date().toISOString(),
    metadata: { kind: 'system' },
  })
}

export const conversationSource = {
  async list(
    request: PaginatedRequest,
    filters?: ConversationListFilters,
  ): Promise<PaginatedResult<Conversation>> {
    await delay()
    return paginate(applyFilters(filters), request)
  },

  async getTabCounts(
    filters?: Omit<ConversationListFilters, 'tab' | 'status' | 'handler'>,
  ): Promise<InboxTabCounts> {
    await delay(80)
    const base = applyFilters({ ...filters, tab: undefined })
    const count = (tab: string) => base.filter((item) => matchesTab(item, tab)).length
    return {
      all: base.length,
      ai: count('ai'),
      waiting: count('waiting'),
      human: count('human'),
      resolved: count('resolved'),
    }
  },

  async getById(id: string): Promise<Conversation | null> {
    await delay()
    return memoryStore.conversations.find((item) => item.id === id) ?? null
  },

  async update(id: string, patch: Partial<Conversation>): Promise<Conversation> {
    await delay()
    const current = memoryStore.conversations.find((item) => item.id === id)
    if (!current) throw new Error('Conversation not found')
    const next = { ...current, ...patch }
    upsertConversation(next)
    return next
  },

  async takeOver(
    id: string,
    assigneeUserId = 'user-supervisor',
    assigneeName = 'Ahmed Supervisor',
  ): Promise<Conversation> {
    await delay()
    const current = memoryStore.conversations.find((item) => item.id === id)
    if (!current) throw new Error('Conversation not found')
    const next: Conversation = {
      ...current,
      handler: ConversationHandler.Human,
      status: ConversationStatus.Open,
      assignedUserId: assigneeUserId,
      assigneeName,
      isTyping: false,
      lastMessageAt: new Date().toISOString(),
    }
    upsertConversation(next)
    pushSystem(id, `${assigneeName} took over`)
    return next
  },

  async handBackToAi(id: string): Promise<Conversation> {
    await delay()
    const current = memoryStore.conversations.find((item) => item.id === id)
    if (!current) throw new Error('Conversation not found')
    const next: Conversation = {
      ...current,
      handler: ConversationHandler.Ai,
      status: ConversationStatus.AiActive,
      assignedUserId: undefined,
      assigneeName: undefined,
      agentId: current.agentId ?? 'agent-eye-care',
      lastMessageAt: new Date().toISOString(),
    }
    upsertConversation(next)
    pushSystem(id, 'Handed back to AI')
    return next
  },

  async resolve(id: string): Promise<Conversation> {
    await delay()
    const current = memoryStore.conversations.find((item) => item.id === id)
    if (!current) throw new Error('Conversation not found')
    const next: Conversation = {
      ...current,
      status: ConversationStatus.Resolved,
      unreadCount: 0,
      isTyping: false,
      lastMessageAt: new Date().toISOString(),
    }
    upsertConversation(next)
    pushSystem(id, 'Conversation resolved')
    return next
  },

  async assign(
    id: string,
    assigneeUserId: string,
    assigneeName: string,
  ): Promise<Conversation> {
    await delay()
    const current = memoryStore.conversations.find((item) => item.id === id)
    if (!current) throw new Error('Conversation not found')
    const next: Conversation = {
      ...current,
      handler: ConversationHandler.Human,
      status: ConversationStatus.Open,
      assignedUserId: assigneeUserId,
      assigneeName,
      lastMessageAt: new Date().toISOString(),
    }
    upsertConversation(next)
    pushSystem(id, `Assigned to ${assigneeName}`)
    return next
  },

  async addTags(id: string, tags: string[]): Promise<Conversation> {
    await delay()
    const current = memoryStore.conversations.find((item) => item.id === id)
    if (!current) throw new Error('Conversation not found')
    const merged = [...new Set([...(current.tags ?? []), ...tags])]
    const next = { ...current, tags: merged }
    upsertConversation(next)
    return next
  },

  async transferToDepartment(id: string, department: string): Promise<Conversation> {
    await delay()
    const current = memoryStore.conversations.find((item) => item.id === id)
    if (!current) throw new Error('Conversation not found')
    const next: Conversation = {
      ...current,
      status: ConversationStatus.WaitingHuman,
      handler: ConversationHandler.Unassigned,
      transferDepartment: department,
      assignedUserId: undefined,
      assigneeName: undefined,
      lastMessageAt: new Date().toISOString(),
    }
    upsertConversation(next)
    pushSystem(id, `AI handed off to ${department}`)
    return next
  },

  async markRead(id: string): Promise<Conversation> {
    await delay(40)
    const current = memoryStore.conversations.find((item) => item.id === id)
    if (!current) throw new Error('Conversation not found')
    const next = { ...current, unreadCount: 0 }
    upsertConversation(next)
    return next
  },

  async getBookingDraft(conversationId: string): Promise<BookingDraft | null> {
    await delay(60)
    return (
      memoryStore.bookingDrafts.find((item) => item.conversationId === conversationId) ?? null
    )
  },

  async getAiInsight(conversationId: string): Promise<AiInsight | null> {
    await delay(60)
    return memoryStore.aiInsights.find((item) => item.conversationId === conversationId) ?? null
  },

  async updateBookingDraft(
    conversationId: string,
    patch: Partial<BookingDraft>,
  ): Promise<BookingDraft> {
    await delay()
    const current =
      memoryStore.bookingDrafts.find((item) => item.conversationId === conversationId) ??
      ({
        conversationId,
        stepIndex: 0,
        stepTotal: 8,
        confirmationState: 'collecting',
      } as BookingDraft)
    const next = { ...current, ...patch, conversationId }
    upsertBookingDraft(next)
    return next
  },
}
