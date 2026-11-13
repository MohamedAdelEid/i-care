import { useAsync } from '@/application/hooks/use-async'
import { repositories } from '@/composition/repositories'
import type { ChannelType } from '@/domain/enums'

export const useChannels = () => useAsync(() => repositories.channels.list(), [])

export const useChannel = (channelType: ChannelType | undefined) =>
  useAsync(
    () =>
      channelType
        ? repositories.channels.getByType(channelType)
        : Promise.resolve(null),
    [channelType],
  )
