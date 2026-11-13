export const MessageDirection = {
  Inbound: 'inbound',
  Outbound: 'outbound',
} as const

export type MessageDirection = (typeof MessageDirection)[keyof typeof MessageDirection]
