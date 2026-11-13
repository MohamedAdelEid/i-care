import { useChannel } from '@/application/hooks'
import { ChannelType } from '@/domain/enums'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { ChannelConnectionCard } from '../channel-connection-card'

export const TelegramPage = () => {
  const { t } = useTranslation('channels')
  const channel = useChannel(ChannelType.Telegram)

  return (
    <ChannelConnectionCard
      title={t('telegramTitle')}
      channelType={ChannelType.Telegram}
      channel={channel.data}
      isLoading={channel.isLoading}
      error={channel.error}
      onRetry={channel.refetch}
      onChanged={channel.refetch}
    />
  )
}
