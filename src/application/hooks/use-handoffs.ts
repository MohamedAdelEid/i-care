import { useState } from 'react'

import { useAsync } from '@/application/hooks/use-async'
import { repositories } from '@/composition/repositories'
import type { EscalationListFilters } from '@/domain/repositories/escalation.repository'

export const useHandoffs = (filters: EscalationListFilters, pageSize = 20) => {
  const [page, setPage] = useState(1)
  const filterKey = JSON.stringify(filters)
  const query = useAsync(
    () => repositories.escalations.list({ page, pageSize }, filters),
    [page, pageSize, filterKey],
  )
  return { ...query, page, pageSize, setPage }
}

export const useHandoffStats = (filters: EscalationListFilters = {}) => {
  const filterKey = JSON.stringify(filters)
  return useAsync(() => repositories.escalations.getStats(filters), [filterKey])
}

export const useHandoffTabCounts = (
  filters: Omit<EscalationListFilters, 'department'> = {},
) => {
  const filterKey = JSON.stringify(filters)
  return useAsync(() => repositories.escalations.getTabCounts(filters), [filterKey])
}

export const useHandoff = (id: string | undefined) =>
  useAsync(() => (id ? repositories.escalations.getById(id) : Promise.resolve(null)), [id])
