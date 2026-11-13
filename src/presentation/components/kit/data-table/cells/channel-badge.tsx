import { MessageCircle, Send } from 'lucide-react'

import { KitStatusBadge } from '@/presentation/components/kit/badges/status-badge'
import { useTranslation } from '@/presentation/hooks/use-translation'

export type KitChannel = 'whatsapp' | 'telegram'

export interface KitChannelBadgeProps {
  channel: KitChannel
}

export const KitChannelBadge = ({ channel }: KitChannelBadgeProps) => {
  const { t } = useTranslation('kit')
  const isWhatsapp = channel === 'whatsapp'

  return (
    <KitStatusBadge
      tone="neutral"
      variant="soft"
      label={isWhatsapp ? t('channelWhatsapp') : t('channelTelegram')}
      icon={isWhatsapp ? MessageCircle : Send}
    />
  )
}
