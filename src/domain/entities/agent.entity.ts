import type { ChannelType, Language } from '@/domain/enums'

export type AgentStatus = 'live' | 'paused' | 'draft'

export type AgentLanguageBehavior = 'ar' | 'en' | 'auto'

export type KnowledgeKind = 'article' | 'file'

export type KnowledgeStatus = 'enabled' | 'disabled'

export type AgentDetailTab =
  | 'overview'
  | 'instructions'
  | 'knowledge'
  | 'workflows'
  | 'tools'
  | 'escalation'
  | 'playground'

export interface InstructionVersion {
  id: string
  label: string
  body: string
  savedAt: string
}

export interface AgentInstructions {
  tone: string
  languageBehavior: AgentLanguageBehavior
  welcomeMessage: string
  boundaries: string
  characterLimit: number
  versions: InstructionVersion[]
}

export interface EscalationRule {
  id: string
  when: string
  whenKey: 'ask_human' | 'failed_understandings' | 'complaint' | 'custom'
  then: string
  enabled: boolean
}

export interface Agent {
  id: string
  name: string
  description: string
  status: AgentStatus
  /** @deprecated derived from status === 'live' */
  isActive: boolean
  defaultLanguage: Language
  persona: string
  modelPreset?: string
  channelsConnected: ChannelType[]
  conversationsToday: number
  resolutionRate: number
  lastEditedAt: string
  avatarTone: 'ai'
  instructions: AgentInstructions
  escalationRules: EscalationRule[]
  performanceSeries: number[]
}

export interface KnowledgeArticle {
  id: string
  title: string
  body: string
  locale: Language
  tags: string[]
  updatedAt: string
  kind: KnowledgeKind
  status: KnowledgeStatus
  usageCount: number
  ownerName: string
  fileName?: string
  agentId?: string
}

export interface WorkflowStep {
  id: string
  title: string
  description: string
  kind: 'intent' | 'action' | 'handoff'
  iconKey: string
  order: number
}

export interface WorkflowStepDropoff {
  stepId: string
  label: string
  count: number
}

export interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  completionRate: number
  stepDropoff: WorkflowStepDropoff[]
  agentId?: string
}

export interface AgentTool {
  id: string
  name: string
  description: string
  type: 'http' | 'crm' | 'calendar' | 'custom'
  enabled: boolean
}

export interface PlaygroundDebug {
  intent: string
  step: string
  toolCalls: string[]
}

export interface PlaygroundReply {
  reply: string
  debug: PlaygroundDebug
}

export const DEFAULT_AGENT_ID = 'agent-eye-care'
