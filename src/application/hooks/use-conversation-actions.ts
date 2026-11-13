import { useCallback } from 'react'

import { repositories } from '@/composition/repositories'
import type { BookingDraft, MessageMetadata } from '@/domain/entities'
import { SenderType } from '@/domain/enums'

export const useConversationActions = () => {
  const takeOver = useCallback(
    (conversationId: string) => repositories.conversations.takeOver(conversationId),
    [],
  )

  const handBackToAi = useCallback(
    (conversationId: string) => repositories.conversations.handBackToAi(conversationId),
    [],
  )

  const resolve = useCallback(
    (conversationId: string) => repositories.conversations.resolve(conversationId),
    [],
  )

  const assign = useCallback(
    (conversationId: string, assigneeUserId = 'user-supervisor', assigneeName = 'Ahmed Supervisor') =>
      repositories.conversations.assign(conversationId, assigneeUserId, assigneeName),
    [],
  )

  const addTags = useCallback(
    (conversationId: string, tags: string[]) =>
      repositories.conversations.addTags(conversationId, tags),
    [],
  )

  const transferToDepartment = useCallback(
    (conversationId: string, department: string) =>
      repositories.conversations.transferToDepartment(conversationId, department),
    [],
  )

  const markRead = useCallback(
    (conversationId: string) => repositories.conversations.markRead(conversationId),
    [],
  )

  const sendReply = useCallback(
    (conversationId: string, body: string, metadata?: MessageMetadata) =>
      repositories.messages.append(conversationId, body, SenderType.Agent, metadata),
    [],
  )

  const bulkAssign = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map((id) => repositories.conversations.assign(id, 'user-supervisor', 'Ahmed Supervisor')))
  }, [])

  const bulkResolve = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map((id) => repositories.conversations.resolve(id)))
  }, [])

  const bulkHandBackToAi = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map((id) => repositories.conversations.handBackToAi(id)))
  }, [])

  const bulkAddTag = useCallback(async (ids: string[], tag: string) => {
    await Promise.all(ids.map((id) => repositories.conversations.addTags(id, [tag])))
  }, [])

  const updateBookingDraft = useCallback(
    (conversationId: string, patch: Partial<BookingDraft>) =>
      repositories.conversations.updateBookingDraft(conversationId, patch),
    [],
  )

  return {
    takeOver,
    handBackToAi,
    resolve,
    assign,
    addTags,
    transferToDepartment,
    markRead,
    sendReply,
    bulkAssign,
    bulkResolve,
    bulkHandBackToAi,
    bulkAddTag,
    updateBookingDraft,
  }
}
