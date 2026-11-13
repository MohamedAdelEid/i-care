import { Bot, Hand, Inbox, TriangleAlert, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'

import type { Conversation, InboxTabId } from '@/domain/entities'
import { KitDataTableBulkBar, KitEmptyState, KitFilterChip } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { cn } from '@/presentation/utils'

import { ConversationItem } from './conversation-item'

export interface ConversationListProps {
  tab: InboxTabId
  counts?: Record<InboxTabId, number>
  items: Conversation[]
  selectedId?: string
  isLoading?: boolean
  search: string
  onSearchChange: (value: string) => void
  channel?: string
  onChannelChange: (value: string | undefined) => void
  serviceId?: string
  onServiceChange: (value: string | undefined) => void
  unreadOnly: boolean
  onUnreadOnlyChange: (value: boolean) => void
  onSelectTab: (tab: InboxTabId) => void
  onSelectConversation: (id: string) => void
  selectedIds: string[]
  onSelectedIdsChange: (ids: string[]) => void
  bulkActions: {
    onAssign: () => void
    onResolve: () => void
    onHandBack: () => void
    onAddTag: () => void
  }
}

export const ConversationList = ({
  tab,
  counts,
  items,
  selectedId,
  isLoading,
  search,
  onSearchChange,
  channel,
  onChannelChange,
  serviceId,
  onServiceChange,
  unreadOnly,
  onUnreadOnlyChange,
  onSelectTab,
  onSelectConversation,
  selectedIds,
  onSelectedIdsChange,
  bulkActions,
}: ConversationListProps) => {
  const { t } = useTranslation('inbox')
  const [assignee, setAssignee] = useState<string | undefined>()

  const tabs = useMemo(
    () =>
      [
        { id: 'all' as const, label: t('tabAll'), icon: Inbox },
        { id: 'ai' as const, label: t('tabAi'), icon: Bot },
        { id: 'waiting' as const, label: t('tabWaiting'), icon: TriangleAlert },
        { id: 'human' as const, label: t('tabHuman'), icon: UserRound },
        { id: 'resolved' as const, label: t('tabResolved'), icon: Hand },
      ] as const,
    [t],
  )

  const selectedRows = items.filter((item) => selectedIds.includes(item.id))

  const toggleCheck = (id: string, checked: boolean) => {
    if (checked) onSelectedIdsChange([...new Set([...selectedIds, id])])
    else onSelectedIdsChange(selectedIds.filter((value) => value !== id))
  }

  return (
    <div className="flex h-full min-h-0 flex-col border-e border-border bg-card">
      <div className="space-y-2 border-b border-border p-3">
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('filterSearch')}
        />
        <div className="flex gap-1 overflow-x-auto pb-1">
          {tabs.map((item) => {
            const Icon = item.icon
            const active = tab === item.id
            const count = counts?.[item.id]
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors',
                  active
                    ? 'border-primary/30 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:bg-muted/50',
                )}
              >
                <Icon className="size-3.5" aria-hidden />
                <span>{item.label}</span>
                {typeof count === 'number' ? (
                  <span className="rounded-full bg-muted px-1.5 tabular-nums">{count}</span>
                ) : null}
              </button>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="border-input bg-background h-8 rounded-control border px-2 text-xs"
            value={channel ?? 'all'}
            onChange={(event) =>
              onChannelChange(event.target.value === 'all' ? undefined : event.target.value)
            }
            aria-label={t('filterChannel')}
          >
            <option value="all">{t('filterChannel')}</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
          </select>
          <select
            className="border-input bg-background h-8 rounded-control border px-2 text-xs"
            value={serviceId ?? 'all'}
            onChange={(event) =>
              onServiceChange(event.target.value === 'all' ? undefined : event.target.value)
            }
            aria-label={t('filterService')}
          >
            <option value="all">{t('filterService')}</option>
            <option value="retina">{t('serviceRetina')}</option>
            <option value="lasik">{t('serviceLasik')}</option>
            <option value="pediatric">{t('servicePediatric')}</option>
            <option value="optics">{t('serviceOptics')}</option>
            <option value="cataract">{t('serviceCataract')}</option>
          </select>
          <select
            className="border-input bg-background h-8 rounded-control border px-2 text-xs"
            value={assignee ?? 'all'}
            onChange={(event) => setAssignee(event.target.value === 'all' ? undefined : event.target.value)}
            aria-label={t('filterAssignee')}
          >
            <option value="all">{t('filterAssignee')}</option>
            <option value="user-supervisor">Ahmed</option>
            <option value="unassigned">{t('unassigned')}</option>
          </select>
          <Button
            type="button"
            size="sm"
            variant={unreadOnly ? 'default' : 'outline'}
            onClick={() => onUnreadOnlyChange(!unreadOnly)}
          >
            {t('filterUnread')}
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {channel ? (
            <KitFilterChip label={t('filterChannel')} value={channel} onRemove={() => onChannelChange(undefined)} />
          ) : null}
          {serviceId ? (
            <KitFilterChip
              label={t('filterService')}
              value={serviceId}
              onRemove={() => onServiceChange(undefined)}
            />
          ) : null}
          {unreadOnly ? (
            <KitFilterChip
              label={t('filterUnread')}
              value="on"
              onRemove={() => onUnreadOnlyChange(false)}
            />
          ) : null}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-2 p-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <KitEmptyState title={t('emptyList')} className="m-3 border-none bg-transparent" />
        ) : (
          items.map((item) => (
            <ConversationItem
              key={item.id}
              conversation={item}
              selected={selectedId === item.id}
              checked={selectedIds.includes(item.id)}
              onSelect={() => onSelectConversation(item.id)}
              onCheck={(checked) => toggleCheck(item.id, checked)}
            />
          ))
        )}
      </div>

      <KitDataTableBulkBar
        count={selectedIds.length}
        rows={selectedRows}
        ids={selectedIds}
        onClear={() => onSelectedIdsChange([])}
        actions={[
          { id: 'assign', label: t('assign'), onAction: () => bulkActions.onAssign() },
          { id: 'resolve', label: t('markResolved'), onAction: () => bulkActions.onResolve() },
          { id: 'handback', label: t('bulkHandBack'), onAction: () => bulkActions.onHandBack() },
          { id: 'tag', label: t('addTag'), onAction: () => bulkActions.onAddTag() },
        ]}
      />
    </div>
  )
}
