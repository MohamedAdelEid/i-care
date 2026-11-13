import type {
  Agent,
  AgentInstructions,
  AgentTool,
  EscalationRule,
  KnowledgeArticle,
  KnowledgeStatus,
  PlaygroundReply,
  Workflow,
} from '@/domain/entities'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'

export type AgentInput = Omit<Agent, 'id' | 'lastEditedAt' | 'isActive'> & {
  id?: string
  lastEditedAt?: string
}

export interface KnowledgeListFilters {
  search?: string
  status?: KnowledgeStatus | 'all'
  kind?: string
}

export type KnowledgeInput = Omit<KnowledgeArticle, 'id' | 'updatedAt' | 'usageCount'> & {
  id?: string
  usageCount?: number
  updatedAt?: string
}

export interface IAgentRepository {
  listAgents(): Promise<Agent[]>
  getAgent(id: string): Promise<Agent | null>
  createAgent(input: AgentInput): Promise<Agent>
  duplicateAgent(id: string): Promise<Agent>
  pauseAgent(id: string): Promise<Agent>
  resumeAgent(id: string): Promise<Agent>
  deleteAgent(id: string): Promise<void>
  updateInstructions(agentId: string, patch: Partial<AgentInstructions>): Promise<AgentInstructions>
  listKnowledge(
    request: PaginatedRequest,
    filters?: KnowledgeListFilters,
  ): Promise<PaginatedResult<KnowledgeArticle>>
  createKnowledge(input: KnowledgeInput): Promise<KnowledgeArticle>
  setKnowledgeStatus(ids: string[], status: KnowledgeStatus): Promise<void>
  deleteKnowledge(ids: string[]): Promise<void>
  listWorkflows(): Promise<Workflow[]>
  getWorkflow(id: string): Promise<Workflow | null>
  listTools(): Promise<AgentTool[]>
  setToolEnabled(id: string, enabled: boolean): Promise<AgentTool>
  listEscalationRules(agentId: string): Promise<EscalationRule[]>
  setEscalationRuleEnabled(agentId: string, ruleId: string, enabled: boolean): Promise<EscalationRule>
  addEscalationRule(agentId: string, rule: Omit<EscalationRule, 'id'>): Promise<EscalationRule>
  playgroundReply(agentId: string, prompt: string): Promise<PlaygroundReply>
}
