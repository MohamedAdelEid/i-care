import { useState } from 'react'

import { useChannelActions } from '@/application/hooks'
import type { ChannelConnection } from '@/domain/entities'
import type { ChannelType } from '@/domain/enums'
import { ChannelConnectionStatus } from '@/domain/enums'
import { notify } from '@/infrastructure/libs/toast/toast'
import {
  KitPageHeader,
  KitRelativeTimeCell,
  KitStatusBadge,
  Sparkline,
} from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { ChannelSetupDrawer } from './channel-setup-drawer'

export interface ChannelConnectionCardProps {
  title: string
  channelType: ChannelType
  channel: ChannelConnection | null | undefined
  isLoading?: boolean
  error?: Error | null
  onRetry?: () => void
  onChanged: () => void
}

export const ChannelConnectionCard = ({
  title,
  channelType,
  channel,
  isLoading,
  error,
  onRetry,
  onChanged,
}: ChannelConnectionCardProps) => {
  const { t } = useTranslation('channels')
  const actions = useChannelActions()
  const [open, setOpen] = useState(false)

  const statusLabel = () => {
    if (!channel || channel.status === ChannelConnectionStatus.Disconnected) {
      return t('statusNotConnected')
    }
    if (channel.status === ChannelConnectionStatus.Error) return t('statusError')
    return t('statusConnected')
  }

  const statusTone = () => {
    if (!channel || channel.status === ChannelConnectionStatus.Disconnected) return 'neutral' as const
    if (channel.status === ChannelConnectionStatus.Error) return 'danger' as const
    return 'success' as const
  }

  const healthLabel = () => {
    if (!channel) return t('healthDown')
    if (channel.health === 'healthy') return t('healthHealthy')
    if (channel.health === 'degraded') return t('healthDegraded')
    return t('healthDown')
  }

  const healthTone = () => {
    if (!channel || channel.health === 'down') return 'danger' as const
    if (channel.health === 'degraded') return 'warning' as const
    return 'success' as const
  }

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader title={title} description={t('description')} />

      {isLoading ? <p className="text-muted-foreground text-sm">…</p> : null}
      {error ? (
        <div className="space-y-2">
          <p className="text-destructive text-sm">{String(error)}</p>
          {onRetry ? (
            <Button type="button" variant="outline" onClick={onRetry}>
              Retry
            </Button>
          ) : null}
        </div>
      ) : null}

      {channel ? (
        <section className="rounded-card border border-border bg-card p-5 space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold">{channel.displayName}</h2>
            <KitStatusBadge tone={statusTone()} label={statusLabel()} />
            <KitStatusBadge tone={healthTone()} label={`${t('health')}: ${healthLabel()}`} />
          </div>
          <p className="text-muted-foreground text-sm">{channel.configSummary}</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">{t('lastMessage')}</p>
              {channel.lastMessageAt ? (
                <KitRelativeTimeCell date={channel.lastMessageAt} />
              ) : (
                <span>—</span>
              )}
            </div>
            <div className="min-w-[140px]">
              <p className="text-muted-foreground mb-1 text-xs">{t('todayVolume')}</p>
              <Sparkline
                data={(channel.volumeTodaySeries ?? []).map((value) => ({ value }))}
                ariaLabel={t('todayVolume')}
                height={36}
                width={160}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                void actions.reconnect(channelType).then(() => {
                  notify.success({ title: t('reconnectSuccess') })
                  onChanged()
                })
              }}
            >
              {t('reconnect')}
            </Button>
            <Button type="button" onClick={() => setOpen(true)}>
              {t('configure')}
            </Button>
          </div>
        </section>
      ) : null}

      <ChannelSetupDrawer
        open={open}
        onOpenChange={setOpen}
        channelType={channelType}
        channel={channel}
        onSaved={onChanged}
      />
    </div>
  )
}
