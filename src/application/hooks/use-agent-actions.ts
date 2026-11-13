import { useCallback, useState } from 'react'

import { repositories } from '@/composition/repositories'
import type {
  AgentInstructions,
  EscalationRule,
  KnowledgeStatus,
} from '@/domain/entities'
import type { AgentInput, KnowledgeInput } from '@/domain/repositories/agent.repository'

export const useAgentActions = () => {
  const [isPlaygroundSending, setIsPlaygroundSending] = useState(false)

  const createAgent = useCallback(
    (input: AgentInput) => repositories.agents.createAgent(input),
    [],
  )
  const duplicateAgent = useCallback(
    (id: string) => repositories.agents.duplicateAgent(id),
    [],
  )
  const pauseAgent = useCallback((id: string) => repositories.agents.pauseAgent(id), [])
  const resumeAgent = useCallback((id: string) => repositories.agents.resumeAgent(id), [])
  const deleteAgent = useCallback((id: string) => repositories.agents.deleteAgent(id), [])
  const updateInstructions = useCallback(
    (agentId: string, patch: Partial<AgentInstructions>) =>
      repositories.agents.updateInstructions(agentId, patch),
    [],
  )
  const createKnowledge = useCallback(
    (input: KnowledgeInput) => repositories.agents.createKnowledge(input),
    [],
  )
  const setKnowledgeStatus = useCallback(
    (ids: string[], status: KnowledgeStatus) =>
      repositories.agents.setKnowledgeStatus(ids, status),
    [],
  )
  const deleteKnowledge = useCallback(
    (ids: string[]) => repositories.agents.deleteKnowledge(ids),
    [],
  )
  const setToolEnabled = useCallback(
    (toolId: string, enabled: boolean) => repositories.agents.setToolEnabled(toolId, enabled),
    [],
  )
  const setEscalationRuleEnabled = useCallback(
    (agentId: string, ruleId: string, enabled: boolean) =>
      repositories.agents.setEscalationRuleEnabled(agentId, ruleId, enabled),
    [],
  )
  const addEscalationRule = useCallback(
    (agentId: string, rule: Omit<EscalationRule, 'id'>) =>
      repositories.agents.addEscalationRule(agentId, rule),
    [],
  )

  const sendPlaygroundMessage = useCallback(async (agentId: string, prompt: string) => {
    setIsPlaygroundSending(true)
    try {
      return await repositories.agents.playgroundReply(agentId, prompt)
    } finally {
      setIsPlaygroundSending(false)
    }
  }, [])

  return {
    createAgent,
    duplicateAgent,
    pauseAgent,
    resumeAgent,
    deleteAgent,
    updateInstructions,
    createKnowledge,
    setKnowledgeStatus,
    deleteKnowledge,
    setToolEnabled,
    setEscalationRuleEnabled,
    addEscalationRule,
    sendPlaygroundMessage,
    isPlaygroundSending,
  }
}
