import type { ChannelConnection, ChannelSetupInput } from '@/domain/entities'
import type { ChannelType } from '@/domain/enums'

export interface IChannelRepository {
  list(): Promise<ChannelConnection[]>
  getByType(channelType: ChannelType): Promise<ChannelConnection | null>
  saveConfig(channelType: ChannelType, payload: Record<string, string>): Promise<ChannelConnection>
  saveSetup(channelType: ChannelType, input: ChannelSetupInput): Promise<ChannelConnection>
  reconnect(channelType: ChannelType): Promise<ChannelConnection>
  sendTestMessage(channelType: ChannelType, message: string): Promise<void>
}
