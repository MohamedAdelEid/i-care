import { useState } from 'react'

import { useAsync } from '@/application/hooks/use-async'
import { repositories } from '@/composition/repositories'
import type { ConversationListFilters } from '@/domain/repositories/conversation.repository'

export const useConversations = (filters: ConversationListFilters, pageSize = 40) => {
  const [page, setPage] = useState(1)
  const filterKey = JSON.stringify(filters)

  const query = useAsync(
    () => repositories.conversations.list({ page, pageSize }, filters),
    [page, pageSize, filterKey],
  )

  return { ...query, page, pageSize, setPage }
}

export const useInboxConversations = (
  filters: ConversationListFilters,
  pageSize = 50,
) => useConversations(filters, pageSize)

export const useInboxTabCounts = (
  filters: Omit<ConversationListFilters, 'tab' | 'status' | 'handler'> = {},
) => {
  const filterKey = JSON.stringify(filters)
  return useAsync(() => repositories.conversations.getTabCounts(filters), [filterKey])
}

export const useConversation = (id: string | undefined) =>
  useAsync(() => (id ? repositories.conversations.getById(id) : Promise.resolve(null)), [id])

export const useConversationMessages = (id: string | undefined) =>
  useAsync(
    () => (id ? repositories.messages.listByConversation(id) : Promise.resolve([])),
    [id],
  )

export const useBookingDraft = (id: string | undefined) =>
  useAsync(
    () => (id ? repositories.conversations.getBookingDraft(id) : Promise.resolve(null)),
    [id],
  )

export const useAiInsight = (id: string | undefined) =>
  useAsync(
    () => (id ? repositories.conversations.getAiInsight(id) : Promise.resolve(null)),
    [id],
  )

export const useConversationDetail = (id: string | undefined) => {
  const conversation = useConversation(id)
  const messages = useConversationMessages(id)
  const bookingDraft = useBookingDraft(id)
  const aiInsight = useAiInsight(id)

  const isLoading =
    conversation.isLoading ||
    messages.isLoading ||
    bookingDraft.isLoading ||
    aiInsight.isLoading

  const error =
    conversation.error || messages.error || bookingDraft.error || aiInsight.error

  const refetch = () => {
    conversation.refetch()
    messages.refetch()
    bookingDraft.refetch()
    aiInsight.refetch()
  }

  return {
    conversation,
    messages,
    bookingDraft,
    aiInsight,
    isLoading,
    error,
    refetch,
  }
}
