export const ConversationHandler = {
  Ai: 'ai',
  Human: 'human',
  Unassigned: 'unassigned',
} as const

export type ConversationHandler = (typeof ConversationHandler)[keyof typeof ConversationHandler]
