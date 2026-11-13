export const SenderType = {
  Customer: 'customer',
  Agent: 'agent',
  Ai: 'ai',
  System: 'system',
} as const

export type SenderType = (typeof SenderType)[keyof typeof SenderType]
