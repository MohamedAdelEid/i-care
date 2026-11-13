import type { ChannelConnection, ChannelSetupInput } from '@/domain/entities/channel.entity'
import type { ChannelType } from '@/domain/enums'
import { ChannelConnectionStatus } from '@/domain/enums'
import { memoryStore } from '@/infrastructure/data/memory-store'
import { delay } from '@/infrastructure/data/utils/source.utils'

const upsert = (next: ChannelConnection) => {
  const index = memoryStore.channels.findIndex((item) => item.channelType === next.channelType)
  if (index >= 0) memoryStore.channels[index] = next
  else memoryStore.channels.push(next)
}

export const channelSource = {
  async list(): Promise<ChannelConnection[]> {
    await delay()
    return [...memoryStore.channels]
  },

  async getByType(channelType: ChannelType): Promise<ChannelConnection | null> {
    await delay(40)
    return memoryStore.channels.find((item) => item.channelType === channelType) ?? null
  },

  async saveConfig(
    channelType: ChannelType,
    payload: Record<string, string>,
  ): Promise<ChannelConnection> {
    return this.saveSetup(channelType, {
      credentials: payload.credentials ?? payload.token ?? 'demo-token-xxxx',
      webhookUrl: payload.webhook ?? payload.webhookUrl ?? 'https://api.icare.local/webhooks',
    })
  },

  async saveSetup(channelType: ChannelType, input: ChannelSetupInput): Promise<ChannelConnection> {
    await delay(120)
    const current = memoryStore.channels.find((item) => item.channelType === channelType)
    if (!current) throw new Error('Channel not found')
    const next: ChannelConnection = {
      ...current,
      status: ChannelConnectionStatus.Connected,
      health: 'healthy',
      lastSyncAt: new Date().toISOString(),
      webhookUrl: input.webhookUrl,
      credentialsMasked: `${input.credentials.slice(0, 3)}_••••••••`,
      configSummary: 'Configured (demo) • webhook active',
    }
    upsert(next)
    return next
  },

  async reconnect(channelType: ChannelType): Promise<ChannelConnection> {
    await delay(200)
    const current = memoryStore.channels.find((item) => item.channelType === channelType)
    if (!current) throw new Error('Channel not found')
    const next: ChannelConnection = {
      ...current,
      status: ChannelConnectionStatus.Connected,
      health: 'healthy',
      lastSyncAt: new Date().toISOString(),
      configSummary: 'Reconnected (demo)',
    }
    upsert(next)
    return next
  },

  async sendTestMessage(channelType: ChannelType, message: string): Promise<void> {
    void channelType
    void message
    await delay(300)
  },
}
