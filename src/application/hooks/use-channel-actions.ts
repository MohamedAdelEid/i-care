import { useCallback } from 'react'

import { repositories } from '@/composition/repositories'
import type { ChannelSetupInput } from '@/domain/entities'
import type { ChannelType } from '@/domain/enums'

export const useChannelActions = () => {
  const saveChannelConfig = useCallback(
    (channelType: ChannelType, payload: Record<string, string>) =>
      repositories.channels.saveConfig(channelType, payload),
    [],
  )
  const saveSetup = useCallback(
    (channelType: ChannelType, input: ChannelSetupInput) =>
      repositories.channels.saveSetup(channelType, input),
    [],
  )
  const reconnect = useCallback(
    (channelType: ChannelType) => repositories.channels.reconnect(channelType),
    [],
  )
  const sendTestMessage = useCallback(
    (channelType: ChannelType, message: string) =>
      repositories.channels.sendTestMessage(channelType, message),
    [],
  )

  return { saveChannelConfig, saveSetup, reconnect, sendTestMessage }
}