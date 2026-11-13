import type { ChannelConnectionStatus, ChannelType } from '@/domain/enums'

export type ChannelHealth = 'healthy' | 'degraded' | 'down'

export interface ChannelConnection {
  channelType: ChannelType
  status: ChannelConnectionStatus
  displayName: string
  lastSyncAt?: string
  configSummary: string
  health: ChannelHealth
  lastMessageAt?: string
  volumeTodaySeries: number[]
  webhookUrl?: string
  credentialsMasked?: string
}

export type ChannelSetupInput = {
  credentials: string
  webhookUrl: string
}
