import type {
  AgentInstructions,
  EscalationRule,
  KnowledgeStatus,
} from '@/domain/entities'
import type {
  AgentInput,
  IAgentRepository,
  KnowledgeInput,
  KnowledgeListFilters,
} from '@/domain/repositories/agent.repository'
import type { PaginatedRequest } from '@/domain/types'
import { agentSource } from '@/infrastructure/data/sources/agent.source'

export class AgentRepository implements IAgentRepository {
  listAgents() {
    return agentSource.listAgents()
  }

  getAgent(id: string) {
    return agentSource.getAgent(id)
  }

  createAgent(input: AgentInput) {
    return agentSource.createAgent(input)
  }

  duplicateAgent(id: string) {
    return agentSource.duplicateAgent(id)
  }

  pauseAgent(id: string) {
    return agentSource.pauseAgent(id)
  }

  resumeAgent(id: string) {
    return agentSource.resumeAgent(id)
  }

  deleteAgent(id: string) {
    return agentSource.deleteAgent(id)
  }

  updateInstructions(agentId: string, patch: Partial<AgentInstructions>) {
    return agentSource.updateInstructions(agentId, patch)
  }

  listKnowledge(request: PaginatedRequest, filters?: KnowledgeListFilters) {
    return agentSource.listKnowledge(request, filters)
  }

  createKnowledge(input: KnowledgeInput) {
    return agentSource.createKnowledge(input)
  }

  setKnowledgeStatus(ids: string[], status: KnowledgeStatus) {
    return agentSource.setKnowledgeStatus(ids, status)
  }

  deleteKnowledge(ids: string[]) {
    return agentSource.deleteKnowledge(ids)
  }

  listWorkflows() {
    return agentSource.listWorkflows()
  }

  getWorkflow(id: string) {
    return agentSource.getWorkflow(id)
  }

  listTools() {
    return agentSource.listTools()
  }

  setToolEnabled(id: string, enabled: boolean) {
    return agentSource.setToolEnabled(id, enabled)
  }

  listEscalationRules(agentId: string) {
    return agentSource.listEscalationRules(agentId)
  }

  setEscalationRuleEnabled(agentId: string, ruleId: string, enabled: boolean) {
    return agentSource.setEscalationRuleEnabled(agentId, ruleId, enabled)
  }

  addEscalationRule(agentId: string, rule: Omit<EscalationRule, 'id'>) {
    return agentSource.addEscalationRule(agentId, rule)
  }

  playgroundReply(agentId: string, prompt: string) {
    return agentSource.playgroundReply(agentId, prompt)
  }
}
