import { AlertTriangle } from 'lucide-react'

import type { Conversation } from '@/domain/entities'
import {
  KitAvatar,
  KitChannelBadge,
  KitStatusBadge,
} from '@/presentation/components/kit'
import { Checkbox } from '@/presentation/components/ui/checkbox'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { cn } from '@/presentation/utils'

import { serviceI18nKey } from './service-label'

const relativeTime = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.max(0, Math.round(diff / 60_000))
  if (mins < 60) return `${mins}m`
  const hours = Math.round(mins / 60)
  if (hours < 48) return `${hours}h`
  return `${Math.round(hours / 24)}d`
}

export interface ConversationItemProps {
  conversation: Conversation
  selected: boolean
  checked: boolean
  onSelect: () => void
  onCheck: (checked: boolean) => void
}

export const ConversationItem = ({
  conversation,
  selected,
  checked,
  onSelect,
  onCheck,
}: ConversationItemProps) => {
  const { t } = useTranslation('inbox')
  const name = conversation.customerName ?? conversation.id
  const slaBad = conversation.slaTone === 'warning' || conversation.slaTone === 'critical'

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect()
        }
      }}
      className={cn(
        'flex w-full items-start gap-2 border-b border-border px-3 py-3 text-start transition-colors',
        selected ? 'bg-primary/5' : 'hover:bg-muted/40',
      )}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onCheck(Boolean(value))}
        onClick={(event) => event.stopPropagation()}
        aria-label={name}
        className="mt-1"
      />
      <KitAvatar name={name} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-foreground">{name}</p>
          {conversation.unreadCount > 0 ? (
            <span className="size-2 shrink-0 rounded-full bg-primary" aria-label="unread" />
          ) : null}
          <span className="text-muted-foreground ms-auto shrink-0 text-[11px] tabular-nums">
            {relativeTime(conversation.lastMessageAt)}
          </span>
        </div>
        <p className="text-muted-foreground mt-0.5 truncate text-xs">
          {conversation.lastMessagePreview}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <KitChannelBadge
            channel={conversation.channelType === 'telegram' ? 'telegram' : 'whatsapp'}
          />
          {conversation.serviceId ? (
            <KitStatusBadge tone="neutral" label={t(serviceI18nKey(conversation.serviceId))} />
          ) : null}
          <KitStatusBadge
            tone={conversation.handler === 'ai' ? 'ai' : 'neutral'}
            label={conversation.handler === 'ai' ? t('handledAi') : t('handledHuman')}
          />
          {slaBad ? (
            <span className="text-warning inline-flex items-center gap-0.5 text-[11px]">
              <AlertTriangle className="size-3" aria-hidden />
              {t('slaWarning')}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
