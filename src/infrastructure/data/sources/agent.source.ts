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
import type {
  AgentInput,
  KnowledgeInput,
  KnowledgeListFilters,
} from '@/domain/repositories/agent.repository'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'
import { memoryStore } from '@/infrastructure/data/memory-store'
import { delay, filterBySearch, paginate } from '@/infrastructure/data/utils/source.utils'

const upsertAgent = (agent: Agent) => {
  const index = memoryStore.agents.findIndex((item) => item.id === agent.id)
  if (index >= 0) memoryStore.agents[index] = agent
  else memoryStore.agents.unshift(agent)
}

const touch = (agent: Agent): Agent => ({
  ...agent,
  lastEditedAt: new Date().toISOString(),
  isActive: agent.status === 'live',
})

export const agentSource = {
  async listAgents() {
    await delay()
    return [...memoryStore.agents].sort((a, b) => b.lastEditedAt.localeCompare(a.lastEditedAt))
  },

  async getAgent(id: string) {
    await delay()
    return memoryStore.agents.find((item) => item.id === id) ?? null
  },

  async createAgent(input: AgentInput): Promise<Agent> {
    await delay(120)
    const agent: Agent = {
      ...input,
      id: input.id ?? `agent-${Date.now()}`,
      lastEditedAt: input.lastEditedAt ?? new Date().toISOString(),
      isActive: input.status === 'live',
      avatarTone: 'ai',
    }
    upsertAgent(agent)
    return agent
  },

  async duplicateAgent(id: string): Promise<Agent> {
    await delay(120)
    const existing = memoryStore.agents.find((item) => item.id === id)
    if (!existing) throw new Error('Agent not found')
    const copy: Agent = {
      ...structuredClone(existing),
      id: `agent-${Date.now()}`,
      name: `${existing.name} (copy)`,
      status: 'draft',
      isActive: false,
      conversationsToday: 0,
      lastEditedAt: new Date().toISOString(),
    }
    upsertAgent(copy)
    return copy
  },

  async pauseAgent(id: string): Promise<Agent> {
    await delay(80)
    const existing = memoryStore.agents.find((item) => item.id === id)
    if (!existing) throw new Error('Agent not found')
    const next = touch({ ...existing, status: 'paused' })
    upsertAgent(next)
    return next
  },

  async resumeAgent(id: string): Promise<Agent> {
    await delay(80)
    const existing = memoryStore.agents.find((item) => item.id === id)
    if (!existing) throw new Error('Agent not found')
    const next = touch({ ...existing, status: 'live' })
    upsertAgent(next)
    return next
  },

  async deleteAgent(id: string): Promise<void> {
    await delay(80)
    memoryStore.agents = memoryStore.agents.filter((item) => item.id !== id)
  },

  async updateInstructions(
    agentId: string,
    patch: Partial<AgentInstructions>,
  ): Promise<AgentInstructions> {
    await delay(100)
    const existing = memoryStore.agents.find((item) => item.id === agentId)
    if (!existing) throw new Error('Agent not found')
    const combined = { ...existing.instructions, ...patch }
    const shouldVersion =
      patch.welcomeMessage !== undefined ||
      patch.boundaries !== undefined ||
      patch.tone !== undefined
    if (shouldVersion) {
      const body = [combined.tone, combined.welcomeMessage, combined.boundaries].join('\n\n')
      combined.versions = [
        {
          id: `ver-${Date.now()}`,
          label: `v${combined.versions.length + 1} — edit`,
          body,
          savedAt: new Date().toISOString(),
        },
        ...combined.versions,
      ]
    }
    upsertAgent(touch({ ...existing, instructions: combined, persona: combined.tone }))
    return combined
  },

  async listKnowledge(
    request: PaginatedRequest,
    filters?: KnowledgeListFilters,
  ): Promise<PaginatedResult<KnowledgeArticle>> {
    await delay()
    let items = [...memoryStore.knowledge]
    if (filters?.status && filters.status !== 'all') {
      items = items.filter((item) => item.status === filters.status)
    }
    if (filters?.kind) items = items.filter((item) => item.kind === filters.kind)
    items = filterBySearch(items, filters?.search, ['title', 'body', 'tags', 'ownerName'])
    items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    return paginate(items, request)
  },

  async createKnowledge(input: KnowledgeInput): Promise<KnowledgeArticle> {
    await delay(100)
    const article: KnowledgeArticle = {
      ...input,
      id: input.id ?? `kb-${Date.now()}`,
      updatedAt: input.updatedAt ?? new Date().toISOString(),
      usageCount: input.usageCount ?? 0,
    }
    memoryStore.knowledge.unshift(article)
    return article
  },

  async setKnowledgeStatus(ids: string[], status: KnowledgeStatus): Promise<void> {
    await delay(80)
    memoryStore.knowledge = memoryStore.knowledge.map((item) =>
      ids.includes(item.id) ? { ...item, status, updatedAt: new Date().toISOString() } : item,
    )
  },

  async deleteKnowledge(ids: string[]): Promise<void> {
    await delay(80)
    memoryStore.knowledge = memoryStore.knowledge.filter((item) => !ids.includes(item.id))
  },

  async listWorkflows(): Promise<Workflow[]> {
    await delay()
    return memoryStore.workflows
  },

  async getWorkflow(id: string): Promise<Workflow | null> {
    await delay()
    return memoryStore.workflows.find((item) => item.id === id) ?? null
  },

  async listTools(): Promise<AgentTool[]> {
    await delay()
    return [...memoryStore.tools]
  },

  async setToolEnabled(id: string, enabled: boolean): Promise<AgentTool> {
    await delay()
    const index = memoryStore.tools.findIndex((item) => item.id === id)
    if (index < 0) throw new Error('Tool not found')
    const next = { ...memoryStore.tools[index]!, enabled }
    memoryStore.tools[index] = next
    return next
  },

  async listEscalationRules(agentId: string): Promise<EscalationRule[]> {
    await delay(60)
    const agent = memoryStore.agents.find((item) => item.id === agentId)
    return agent?.escalationRules ?? []
  },

  async setEscalationRuleEnabled(
    agentId: string,
    ruleId: string,
    enabled: boolean,
  ): Promise<EscalationRule> {
    await delay(60)
    const existing = memoryStore.agents.find((item) => item.id === agentId)
    if (!existing) throw new Error('Agent not found')
    let updated: EscalationRule | undefined
    const rules = existing.escalationRules.map((rule) => {
      if (rule.id !== ruleId) return rule
      updated = { ...rule, enabled }
      return updated
    })
    if (!updated) throw new Error('Rule not found')
    upsertAgent(touch({ ...existing, escalationRules: rules }))
    return updated
  },

  async addEscalationRule(
    agentId: string,
    rule: Omit<EscalationRule, 'id'>,
  ): Promise<EscalationRule> {
    await delay(80)
    const existing = memoryStore.agents.find((item) => item.id === agentId)
    if (!existing) throw new Error('Agent not found')
    const next: EscalationRule = { ...rule, id: `rule-${Date.now()}` }
    upsertAgent(
      touch({ ...existing, escalationRules: [...existing.escalationRules, next] }),
    )
    return next
  },

  async playgroundReply(agentId: string, prompt: string): Promise<PlaygroundReply> {
    void agentId
    await delay(400)
    const lower = prompt.toLowerCase()
    if (lower.includes('appointment') || lower.includes('checkup') || prompt.includes('موعد')) {
      return {
        reply:
          'I can check availability at i-care eye center. Which service do you need — retina, LASIK, pediatric, optics, or cataract?',
        debug: {
          intent: 'book_appointment',
          step: 'Choose service',
          toolCalls: ['Check availability'],
        },
      }
    }
    if (lower.includes('human') || lower.includes('agent') || prompt.includes('موظف')) {
      return {
        reply: 'I will connect you with our call center now.',
        debug: {
          intent: 'ask_human',
          step: 'Handoff to call center',
          toolCalls: ['Handoff to department'],
        },
      }
    }
    return {
      reply:
        'Thanks for your message. I can help with appointments, clinic hours, insurance, or connect you with reception.',
      debug: {
        intent: 'general_faq',
        step: 'Clinic FAQ',
        toolCalls: [],
      },
    }
  },
}
