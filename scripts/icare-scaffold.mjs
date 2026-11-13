import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..', 'src')

const write = (rel, content) => {
  const file = path.join(root, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content.replace(/\r\n/g, '\n'), 'utf8')
}

const files = {}

files['domain/entities/user.entity.ts'] = `export interface User {
  id: string
  name: string
  email: string
  role: string
  avatarUrl?: string
}
`

files['domain/entities/auth.entity.ts'] = `import type { User } from './user.entity'

export interface AuthTokens {
  accessToken: string
}

export interface AuthSession {
  user: User
  tokens: AuthTokens
  permissions: string[]
}
`

files['domain/entities/notification.entity.ts'] = `import type { NotificationType } from '@/domain/enums'

export interface NotificationData {
  conversationId?: string
  escalationId?: string
  customerId?: string
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  body: string
  createdAt: string
  isRead: boolean
  readAt?: string
  data: NotificationData
}
`

files['domain/entities/customer.entity.ts'] = `import type { ChannelType, Language } from '@/domain/enums'

export interface CustomerChannelIdentity {
  channelType: ChannelType
  externalId: string
}

export interface Customer {
  id: string
  displayName: string
  phone: string
  email?: string
  preferredLanguage: Language
  tags: string[]
  createdAt: string
  lastSeenAt: string
  channels: CustomerChannelIdentity[]
}
`

files['domain/entities/conversation.entity.ts'] = `import type { ChannelType, ConversationHandler, ConversationStatus } from '@/domain/enums'

export interface Conversation {
  id: string
  customerId: string
  channelType: ChannelType
  status: ConversationStatus
  handler: ConversationHandler
  assignedUserId?: string
  agentId?: string
  subject?: string
  lastMessageAt: string
  unreadCount: number
  escalationId?: string
  lastMessagePreview?: string
  customerName?: string
  aiReasoning?: string
}
`

files['domain/entities/message.entity.ts'] = `import type { MessageDirection, SenderType } from '@/domain/enums'

export interface Message {
  id: string
  conversationId: string
  direction: MessageDirection
  senderType: SenderType
  body: string
  sentAt: string
}
`

files['domain/entities/escalation.entity.ts'] = `import type { EscalationPriority, EscalationStatus } from '@/domain/enums'

export interface Escalation {
  id: string
  conversationId: string
  reason: string
  priority: EscalationPriority
  status: EscalationStatus
  assignedUserId?: string
  openedAt: string
  resolvedAt?: string
  notes?: string
  customerName?: string
}
`

files['domain/entities/agent.entity.ts'] = `import type { Language } from '@/domain/enums'

export interface Agent {
  id: string
  name: string
  description: string
  isActive: boolean
  defaultLanguage: Language
  persona: string
  modelPreset?: string
}

export interface KnowledgeArticle {
  id: string
  title: string
  body: string
  locale: Language
  tags: string[]
  updatedAt: string
}

export interface WorkflowStep {
  id: string
  title: string
  description: string
  kind: 'intent' | 'action' | 'handoff'
}

export interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
}

export interface AgentTool {
  id: string
  name: string
  description: string
  type: 'http' | 'crm' | 'calendar' | 'custom'
  enabled: boolean
}
`

files['domain/entities/channel.entity.ts'] = `import type { ChannelConnectionStatus, ChannelType } from '@/domain/enums'

export interface ChannelConnection {
  channelType: ChannelType
  status: ChannelConnectionStatus
  displayName: string
  lastSyncAt?: string
  configSummary: string
}
`

files['domain/entities/settings.entity.ts'] = `export interface TeamMember {
  id: string
  name: string
  email: string
  roleId: string
  status: 'active' | 'invited' | 'disabled'
}

export interface Role {
  id: string
  name: string
  permissions: string[]
}

export interface BusinessHoursSlot {
  day: number
  open: string
  close: string
  enabled: boolean
}

export interface BusinessHours {
  timezone: string
  slots: BusinessHoursSlot[]
}

export interface NotificationPreference {
  eventType: string
  inApp: boolean
  email: boolean
}

export interface ApiKeySummary {
  id: string
  label: string
  createdAt: string
  lastUsedAt?: string
  maskedKey: string
}

export interface GeneralSettings {
  orgName: string
  defaultLanguage: string
  timezone: string
}
`

files['domain/entities/analytics.entity.ts'] = `export interface PerformanceSnapshot {
  period: string
  conversationsTotal: number
  avgFirstResponseMs: number
  resolutionRate: number
  aiDeflectionRate: number
}

export interface InsightPoint {
  label: string
  value: number
  delta?: number
  series: number[]
}

export interface UnansweredTopic {
  topic: string
  count: number
  sampleUtterances: string[]
}

export interface CsatSummary {
  score: number
  responseCount: number
  distribution: { label: string; value: number }[]
}
`

files['domain/entities/index.ts'] = `export * from './user.entity'
export * from './auth.entity'
export * from './notification.entity'
export * from './customer.entity'
export * from './conversation.entity'
export * from './message.entity'
export * from './escalation.entity'
export * from './agent.entity'
export * from './channel.entity'
export * from './settings.entity'
export * from './analytics.entity'
`

for (const [rel, content] of Object.entries(files)) {
  write(rel, content)
}

console.log(`Wrote ${Object.keys(files).length} entity files`)
