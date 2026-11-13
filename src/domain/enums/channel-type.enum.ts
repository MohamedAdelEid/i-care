export const ChannelType = {
  Whatsapp: 'whatsapp',
  Telegram: 'telegram',
} as const

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType]
