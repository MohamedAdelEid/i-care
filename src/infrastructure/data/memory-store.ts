import type {
  AgentTool,
  AiInsight,
  Booking,
  BookingDraft,
  ClinicDepartment,
  ClinicSchedule,
  ClinicService,
  Conversation,
  Doctor,
  Escalation,
  Message,
  WebhookEndpoint,
} from '@/domain/entities'
import {
  SEED_AGENTS,
  SEED_AI_INSIGHTS,
  SEED_BOOKING_DRAFTS,
  SEED_BOOKINGS,
  SEED_CHANNELS,
  SEED_CLINIC_DEPARTMENTS,
  SEED_CLINIC_SCHEDULE,
  SEED_CLINIC_SERVICES,
  SEED_CONVERSATIONS,
  SEED_CSAT,
  SEED_CUSTOMERS,
  SEED_DOCTORS,
  SEED_ESCALATIONS,
  SEED_GENERAL,
  SEED_HOURS,
  SEED_INSIGHTS,
  SEED_KB,
  SEED_MESSAGES,
  SEED_NOTIFICATION_PREFS,
  SEED_PERFORMANCE,
  SEED_API_KEYS,
  SEED_ROLES,
  SEED_TEAM,
  SEED_WEBHOOKS,
  SEED_TOOLS,
  SEED_TOPIC_MIX,
  SEED_CHANNEL_MIX,
  SEED_UNANSWERED,
  SEED_VOLUME_SERIES,
  SEED_WORKFLOWS,
} from './dummy/seed.generated'

const clone = <T>(value: T): T => structuredClone(value)

export const memoryStore = {
  customers: clone(SEED_CUSTOMERS),
  conversations: clone(SEED_CONVERSATIONS),
  messages: clone(SEED_MESSAGES),
  bookingDrafts: clone(SEED_BOOKING_DRAFTS),
  aiInsights: clone(SEED_AI_INSIGHTS),
  escalations: clone(SEED_ESCALATIONS),
  bookings: clone(SEED_BOOKINGS) as Booking[],
  doctors: clone(SEED_DOCTORS) as Doctor[],
  clinicServices: clone(SEED_CLINIC_SERVICES) as ClinicService[],
  clinicDepartments: clone(SEED_CLINIC_DEPARTMENTS) as ClinicDepartment[],
  clinicSchedule: clone(SEED_CLINIC_SCHEDULE) as ClinicSchedule,
  agents: clone(SEED_AGENTS),
  knowledge: clone(SEED_KB),
  workflows: clone(SEED_WORKFLOWS),
  tools: clone(SEED_TOOLS) as AgentTool[],
  channels: clone(SEED_CHANNELS),
  team: clone(SEED_TEAM),
  roles: clone(SEED_ROLES),
  general: clone(SEED_GENERAL),
  hours: clone(SEED_HOURS),
  notificationPrefs: clone(SEED_NOTIFICATION_PREFS),
  apiKeys: clone(SEED_API_KEYS),
  webhooks: clone(SEED_WEBHOOKS) as WebhookEndpoint[],
  performance: clone(SEED_PERFORMANCE),
  volumeSeries: [...SEED_VOLUME_SERIES],
  channelMix: [...SEED_CHANNEL_MIX],
  topicMix: [...SEED_TOPIC_MIX],
  insights: clone(SEED_INSIGHTS),
  unanswered: clone(SEED_UNANSWERED),
  csat: clone(SEED_CSAT),
}

export const upsertConversation = (conversation: Conversation) => {
  const index = memoryStore.conversations.findIndex((item) => item.id === conversation.id)
  if (index >= 0) memoryStore.conversations[index] = conversation
  else memoryStore.conversations.unshift(conversation)
}

export const upsertEscalation = (escalation: Escalation) => {
  const index = memoryStore.escalations.findIndex((item) => item.id === escalation.id)
  if (index >= 0) memoryStore.escalations[index] = escalation
  else memoryStore.escalations.unshift(escalation)
}

export const appendMessage = (message: Message) => {
  memoryStore.messages.push(message)
}

export const upsertBookingDraft = (draft: BookingDraft) => {
  const index = memoryStore.bookingDrafts.findIndex(
    (item) => item.conversationId === draft.conversationId,
  )
  if (index >= 0) memoryStore.bookingDrafts[index] = draft
  else memoryStore.bookingDrafts.push(draft)
}

export const upsertAiInsight = (insight: AiInsight) => {
  const index = memoryStore.aiInsights.findIndex(
    (item) => item.conversationId === insight.conversationId,
  )
  if (index >= 0) memoryStore.aiInsights[index] = insight
  else memoryStore.aiInsights.push(insight)
}
