import { useState } from 'react'

import { useAsync } from '@/application/hooks/use-async'
import { repositories } from '@/composition/repositories'
import type { KnowledgeListFilters } from '@/domain/repositories/agent.repository'

export const useAgents = () => useAsync(() => repositories.agents.listAgents(), [])

export const useAgent = (id: string | undefined) =>
  useAsync(() => (id ? repositories.agents.getAgent(id) : Promise.resolve(null)), [id])

export const useKnowledgeBase = (filters: KnowledgeListFilters = {}, pageSize = 15) => {
  const [page, setPage] = useState(1)
  const filterKey = JSON.stringify(filters)
  const query = useAsync(
    () => repositories.agents.listKnowledge({ page, pageSize }, filters),
    [page, pageSize, filterKey],
  )
  return { ...query, page, pageSize, setPage }
}

export const useWorkflows = () => useAsync(() => repositories.agents.listWorkflows(), [])

export const useWorkflow = (id: string | undefined) =>
  useAsync(() => (id ? repositories.agents.getWorkflow(id) : Promise.resolve(null)), [id])

export const useAgentTools = () => useAsync(() => repositories.agents.listTools(), [])

export const useEscalationRules = (agentId: string | undefined) =>
  useAsync(
    () =>
      agentId
        ? repositories.agents.listEscalationRules(agentId)
        : Promise.resolve([]),
    [agentId],
  )
