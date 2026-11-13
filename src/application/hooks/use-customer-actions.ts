import { useCallback } from 'react'

import { repositories } from '@/composition/repositories'
import type { Customer } from '@/domain/entities'
import type { CustomerInput } from '@/domain/repositories/customer.repository'

export const useCustomerActions = () => {
  const create = useCallback((input: CustomerInput) => repositories.customers.create(input), [])
  const update = useCallback(
    (id: string, patch: Partial<Customer>) => repositories.customers.update(id, patch),
    [],
  )
  const remove = useCallback((id: string) => repositories.customers.delete(id), [])
  const block = useCallback((id: string) => repositories.customers.block(id), [])
  const unblock = useCallback((id: string) => repositories.customers.unblock(id), [])
  const addTags = useCallback(
    (ids: string[], tags: string[]) => repositories.customers.addTags(ids, tags),
    [],
  )
  const setTags = useCallback(
    (id: string, tags: string[]) => repositories.customers.setTags(id, tags),
    [],
  )
  const addNote = useCallback(
    (customerId: string, body: string) => repositories.customers.addNote(customerId, body),
    [],
  )
  const updateNote = useCallback(
    (customerId: string, noteId: string, body: string) =>
      repositories.customers.updateNote(customerId, noteId, body),
    [],
  )
  const pinNote = useCallback(
    (customerId: string, noteId: string, pinned: boolean) =>
      repositories.customers.pinNote(customerId, noteId, pinned),
    [],
  )
  const deleteNote = useCallback(
    (customerId: string, noteId: string) => repositories.customers.deleteNote(customerId, noteId),
    [],
  )

  const bulkBlock = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map((id) => repositories.customers.block(id)))
  }, [])

  const bulkDelete = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map((id) => repositories.customers.delete(id)))
  }, [])

  return {
    create,
    update,
    remove,
    block,
    unblock,
    addTags,
    setTags,
    addNote,
    updateNote,
    pinNote,
    deleteNote,
    bulkBlock,
    bulkDelete,
  }
}
