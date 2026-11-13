export const ChannelConnectionStatus = {
  Connected: 'connected',
  Disconnected: 'disconnected',
  Error: 'error',
} as const

export type ChannelConnectionStatus =
  (typeof ChannelConnectionStatus)[keyof typeof ChannelConnectionStatus]
