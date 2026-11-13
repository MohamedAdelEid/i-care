import { useCallback } from 'react'

import { repositories } from '@/composition/repositories'
import type { EscalationPriority } from '@/domain/enums'
import { useAuthStore } from '@/presentation/store'

export const useHandoffActions = () => {
  const userId = useAuthStore((state) => state.user?.id ?? 'user-supervisor')
  const userName = useAuthStore((state) => state.user?.name ?? 'Ahmed Supervisor')

  const accept = useCallback(
    (id: string) => repositories.escalations.accept(id, userId, userName),
    [userId, userName],
  )

  const assignToMe = useCallback(
    (id: string) => repositories.escalations.assign(id, userId, userName),
    [userId, userName],
  )

  const reassign = useCallback(
    (id: string, assigneeUserId: string, assigneeName: string) =>
      repositories.escalations.reassign(id, assigneeUserId, assigneeName),
    [],
  )

  const changePriority = useCallback(
    (id: string, priority: EscalationPriority) =>
      repositories.escalations.changePriority(id, priority),
    [],
  )

  const resolve = useCallback((id: string) => repositories.escalations.resolve(id), [])

  const returnToAi = useCallback((id: string) => repositories.escalations.returnToAi(id), [])

  const addNote = useCallback(
    (id: string, body: string) => repositories.escalations.addNote(id, body, userName),
    [userName],
  )

  const bulkAssign = useCallback(
    async (ids: string[]) => {
      await Promise.all(ids.map((id) => repositories.escalations.assign(id, userId, userName)))
    },
    [userId, userName],
  )

  const bulkResolve = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map((id) => repositories.escalations.resolve(id)))
  }, [])

  const bulkChangePriority = useCallback(async (ids: string[], priority: EscalationPriority) => {
    await Promise.all(ids.map((id) => repositories.escalations.changePriority(id, priority)))
  }, [])

  return {
    accept,
    assignToMe,
    reassign,
    changePriority,
    resolve,
    returnToAi,
    addNote,
    bulkAssign,
    bulkResolve,
    bulkChangePriority,
  }
}

/** @deprecated Prefer useHandoffActions */
export const useEscalationActions = () => {
  const actions = useHandoffActions()
  return { assignToMe: actions.assignToMe, resolve: actions.resolve }
}
