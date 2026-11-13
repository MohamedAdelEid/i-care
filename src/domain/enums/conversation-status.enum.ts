export const ConversationStatus = {
  Open: 'open',
  WaitingHuman: 'waiting_human',
  AiActive: 'ai_active',
  Resolved: 'resolved',
  Archived: 'archived',
} as const

export type ConversationStatus = (typeof ConversationStatus)[keyof typeof ConversationStatus]
