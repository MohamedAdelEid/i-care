export const NotificationType = {
  EscalationOpened: 'escalation_opened',
  ConversationAssigned: 'conversation_assigned',
  AiHandoff: 'ai_handoff',
  ChannelDisconnected: 'channel_disconnected',
  CustomerMessage: 'customer_message',
} as const

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]
