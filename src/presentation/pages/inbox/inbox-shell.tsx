import { HelpCircle, PanelLeft, PanelRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  useConversationActions,
  useConversationDetail,
  useInboxConversations,
  useInboxTabCounts,
} from '@/application/hooks'
import { useCustomer } from '@/application/hooks/use-customers'
import type { InboxTabId } from '@/domain/entities'
import { notify } from '@/infrastructure/libs/toast/toast'
import { KitPageHeader } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/ui/dialog'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { cn } from '@/presentation/utils'

import { ContextPanel } from './context-panel'
import { ConversationList } from './conversation-list'
import { ShortcutsDialog } from './shortcuts-dialog'
import { ThreadPane } from './thread-pane'

const TABS: InboxTabId[] = ['all', 'ai', 'waiting', 'human', 'resolved']

const isTab = (value: string | undefined): value is InboxTabId =>
  Boolean(value && TABS.includes(value as InboxTabId))

export interface InboxShellProps {
  tab: InboxTabId
}

type MobilePane = 'list' | 'thread' | 'context'

export const InboxShell = ({ tab }: InboxShellProps) => {
  const { t } = useTranslation('inbox')
  const navigate = useNavigate()
  const params = useParams<{ conversationId?: string }>()
  const selectedId = params.conversationId

  const [search, setSearch] = useState('')
  const [channel, setChannel] = useState<string | undefined>()
  const [serviceId, setServiceId] = useState<string | undefined>()
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [listCollapsed, setListCollapsed] = useState(false)
  const [contextCollapsed, setContextCollapsed] = useState(false)
  const [mobilePane, setMobilePane] = useState<MobilePane>(selectedId ? 'thread' : 'list')
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  const [transferDept, setTransferDept] = useState('call_center')

  const listFilters = useMemo(
    () => ({
      tab,
      search,
      channel,
      serviceId,
      unreadOnly,
    }),
    [tab, search, channel, serviceId, unreadOnly],
  )

  const list = useInboxConversations(listFilters)
  const counts = useInboxTabCounts({ search, channel, serviceId, unreadOnly })
  const detail = useConversationDetail(selectedId)
  const customer = useCustomer(detail.conversation.data?.customerId)
  const actions = useConversationActions()

  const items = useMemo(() => list.data?.items ?? [], [list.data?.items])
  const conversation = detail.conversation.data

  const previous = useMemo(() => {
    const customerId = conversation?.customerId
    if (!customerId) return []
    return items.filter((item) => item.customerId === customerId && item.id !== conversation.id)
  }, [items, conversation])

  const goTab = (next: InboxTabId) => {
    navigate(selectedId ? ROUTES.INBOX.conversation(next, selectedId) : ROUTES.INBOX.tab(next))
  }

  const selectConversation = (id: string) => {
    navigate(ROUTES.INBOX.conversation(tab, id))
    setMobilePane('thread')
    void actions.markRead(id).then(() => list.refetch())
  }

  const refreshAll = () => {
    list.refetch()
    counts.refetch()
    detail.refetch()
  }

  const run = async (fn: () => Promise<unknown>, title: string) => {
    await fn()
    notify.success({ title })
    refreshAll()
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, [contenteditable=true]')) return

      if (event.key === '?' || (event.shiftKey && event.key === '/')) {
        event.preventDefault()
        setShortcutsOpen(true)
        return
      }

      const ids = items.map((item) => item.id)
      const index = selectedId ? ids.indexOf(selectedId) : -1

      if (event.key === 'j' || event.key === 'ArrowDown') {
        event.preventDefault()
        const next = ids[Math.min(ids.length - 1, Math.max(0, index + 1))]
        if (next) selectConversation(next)
      }
      if (event.key === 'k' || event.key === 'ArrowUp') {
        event.preventDefault()
        const next = ids[Math.max(0, index <= 0 ? 0 : index - 1)]
        if (next) selectConversation(next)
      }
      if (event.key === 'Enter' && selectedId) {
        setMobilePane('thread')
      }
      if (event.key === 't' && selectedId) {
        void run(() => actions.takeOver(selectedId), t('takeoverSuccess'))
      }
      if (event.key === 'r' && selectedId) {
        void run(() => actions.resolve(selectedId), t('resolveSuccess'))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyboard bindings; avoid rebind storms
  }, [items, selectedId, t])

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="border-b border-border px-4 py-3">
        <KitPageHeader
          title={t('title')}
          description={t('description')}
          secondaryActions={
            <div className="flex items-center gap-1">
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="hidden lg:inline-flex"
                onClick={() => setListCollapsed((value) => !value)}
                aria-label={listCollapsed ? t('expandList') : t('collapseList')}
              >
                <PanelLeft className="size-4" />
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="hidden lg:inline-flex"
                onClick={() => setContextCollapsed((value) => !value)}
                aria-label={contextCollapsed ? t('expandContext') : t('collapseContext')}
              >
                <PanelRight className="size-4" />
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={() => setShortcutsOpen(true)}
                aria-label={t('shortcutsTitle')}
              >
                <HelpCircle className="size-4" />
              </Button>
            </div>
          }
        />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)_minmax(260px,320px)]">
        <div
          className={cn(
            'min-h-0',
            mobilePane === 'list' ? 'block' : 'hidden lg:block',
            listCollapsed && 'lg:hidden',
          )}
        >
          <ConversationList
            tab={tab}
            counts={counts.data ?? undefined}
            items={items}
            selectedId={selectedId}
            isLoading={list.isLoading}
            search={search}
            onSearchChange={setSearch}
            channel={channel}
            onChannelChange={setChannel}
            serviceId={serviceId}
            onServiceChange={setServiceId}
            unreadOnly={unreadOnly}
            onUnreadOnlyChange={setUnreadOnly}
            onSelectTab={goTab}
            onSelectConversation={selectConversation}
            selectedIds={selectedIds}
            onSelectedIdsChange={setSelectedIds}
            bulkActions={{
              onAssign: () =>
                void run(() => actions.bulkAssign(selectedIds), t('assignSuccess')).then(() =>
                  setSelectedIds([]),
                ),
              onResolve: () =>
                void run(() => actions.bulkResolve(selectedIds), t('resolveSuccess')).then(() =>
                  setSelectedIds([]),
                ),
              onHandBack: () =>
                void run(() => actions.bulkHandBackToAi(selectedIds), t('handbackSuccess')).then(
                  () => setSelectedIds([]),
                ),
              onAddTag: () =>
                void run(() => actions.bulkAddTag(selectedIds, 'follow-up'), t('tagSuccess')).then(
                  () => setSelectedIds([]),
                ),
            }}
          />
        </div>

        <div
          className={cn(
            'min-h-0 border-x border-border',
            mobilePane === 'thread' ? 'block' : 'hidden lg:block',
          )}
        >
          <ThreadPane
            conversation={conversation}
            messages={detail.messages.data ?? []}
            isLoading={detail.isLoading && Boolean(selectedId)}
            showBack
            onBack={() => setMobilePane('list')}
            onTakeOver={() => {
              if (!selectedId) return
              void run(() => actions.takeOver(selectedId), t('takeoverSuccess'))
            }}
            onHandBack={() => {
              if (!selectedId) return
              void run(() => actions.handBackToAi(selectedId), t('handbackSuccess'))
            }}
            onTransfer={() => setTransferOpen(true)}
            onResolve={() => {
              if (!selectedId) return
              void run(() => actions.resolve(selectedId), t('resolveSuccess'))
            }}
            onSend={async (body) => {
              if (!selectedId) return
              await actions.sendReply(selectedId, body)
              notify.success({ title: t('replySuccess') })
              refreshAll()
            }}
          />
          {selectedId ? (
            <div className="border-t border-border p-2 lg:hidden">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => setMobilePane('context')}
              >
                {t('showContext')}
              </Button>
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            'min-h-0',
            mobilePane === 'context' ? 'block' : 'hidden lg:block',
            contextCollapsed && 'lg:hidden',
          )}
        >
          <ContextPanel
            conversation={conversation}
            customer={customer.data}
            bookingDraft={detail.bookingDraft.data}
            aiInsight={detail.aiInsight.data}
            previous={previous}
            isLoading={detail.isLoading && Boolean(selectedId)}
            showClose
            onClose={() => setMobilePane('thread')}
            onConfirmBooking={() => {
              if (!selectedId) return
              void actions
                .updateBookingDraft(selectedId, { confirmationState: 'confirmed', stepIndex: 8 })
                .then(() => {
                  notify.success({ title: t('confirmationConfirmed') })
                  detail.refetch()
                })
            }}
            onEditBooking={() => {
              if (!selectedId) return
              void actions
                .updateBookingDraft(selectedId, { confirmationState: 'editing' })
                .then(() => detail.refetch())
            }}
          />
        </div>
      </div>

      <ShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />

      <Dialog open={transferOpen} onOpenChange={setTransferOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('transferTitle')}</DialogTitle>
            <DialogDescription>{t('transferDescription')}</DialogDescription>
          </DialogHeader>
          <select
            className="border-input bg-background h-9 w-full rounded-control border px-2 text-sm"
            value={transferDept}
            onChange={(event) => setTransferDept(event.target.value)}
          >
            <option value="call_center">{t('deptCallCenter')}</option>
            <option value="results">{t('deptResults')}</option>
            <option value="contracts">{t('deptContracts')}</option>
          </select>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setTransferOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (!selectedId) return
                void run(
                  () => actions.transferToDepartment(selectedId, transferDept),
                  t('transferSuccess'),
                ).then(() => setTransferOpen(false))
              }}
            >
              {t('transfer')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export const LegacyInboxRedirect = () => {
  const { conversationId } = useParams<{ conversationId: string }>()
  const navigate = useNavigate()
  useEffect(() => {
    if (!conversationId) return
    if (isTab(conversationId)) {
      navigate(ROUTES.INBOX.tab(conversationId), { replace: true })
      return
    }
    navigate(ROUTES.INBOX.thread(conversationId), { replace: true })
  }, [conversationId, navigate])
  return null
}
