import type { ChannelSetupInput } from '@/domain/entities'
import type { IChannelRepository } from '@/domain/repositories/channel.repository'
import type { ChannelType } from '@/domain/enums'
import { channelSource } from '@/infrastructure/data/sources/channel.source'

export class ChannelRepository implements IChannelRepository {
  list() {
    return channelSource.list()
  }

  getByType(channelType: ChannelType) {
    return channelSource.getByType(channelType)
  }

  saveConfig(channelType: ChannelType, payload: Record<string, string>) {
    return channelSource.saveConfig(channelType, payload)
  }

  saveSetup(channelType: ChannelType, input: ChannelSetupInput) {
    return channelSource.saveSetup(channelType, input)
  }

  reconnect(channelType: ChannelType) {
    return channelSource.reconnect(channelType)
  }

  sendTestMessage(channelType: ChannelType, message: string) {
    return channelSource.sendTestMessage(channelType, message)
  }
}
