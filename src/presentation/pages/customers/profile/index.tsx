import { createColumnHelper } from '@tanstack/react-table'
import {
  CalendarDays,
  CalendarPlus,
  HeartHandshake,
  MessageSquare,
  MessagesSquare,
  Pencil,
  Pin,
  Sparkles,
  Star,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useCustomer, useCustomerActions } from '@/application/hooks'
import type {
  CustomerAttachment,
  CustomerBookingSummary,
  CustomerConversationSummary,
} from '@/domain/entities'
import { notify } from '@/infrastructure/libs/toast/toast'
import {
  KitAvatar,
  KitChannelBadge,
  KitDataTable,
  KitLightbox,
  KitPageHeader,
  KitRelativeTimeCell,
  KitStatusBadge,
  KitTagsCell,
  StatCard,
  StatsStrip,
} from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Input, Textarea } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { cn } from '@/presentation/utils'

import { CustomerDrawer } from '../customer-drawer'

type ProfileTab = 'overview' | 'conversations' | 'bookings' | 'attachments' | 'notes'

const convHelper = createColumnHelper<CustomerConversationSummary>()
const bookingHelper = createColumnHelper<CustomerBookingSummary>()

export const CustomerProfilePage = () => {
  const { customerId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation('customers')
  const customer = useCustomer(customerId)
  const actions = useCustomerActions()
  const [tab, setTab] = useState<ProfileTab>('overview')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [lightbox, setLightbox] = useState<CustomerAttachment | null>(null)
  const [noteBody, setNoteBody] = useState('')
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editingNoteBody, setEditingNoteBody] = useState('')
  const [tagDraft, setTagDraft] = useState('')

  const data = customer.data

  const convColumns = useMemo(
    () => [
      convHelper.accessor('subject', { header: () => t('tabConversations') }),
      convHelper.accessor('channelType', {
        header: () => t('colChannels'),
        cell: (info) => <KitChannelBadge channel={info.getValue()} />,
      }),
      convHelper.accessor('status', {
        header: () => t('colStatus'),
        cell: (info) => <KitStatusBadge tone="neutral" label={info.getValue()} />,
      }),
      convHelper.accessor('lastMessageAt', {
        header: () => t('colLastContact'),
        cell: (info) => <KitRelativeTimeCell date={info.getValue()} />,
      }),
    ],
    [t],
  )

  const bookingColumns = useMemo(
    () => [
      bookingHelper.accessor('day', { header: () => t('tabBookings') }),
      bookingHelper.accessor('timeSlot', {
        header: () => 'Slot',
        cell: (info) => <KitStatusBadge tone="info" label={info.getValue()} />,
      }),
      bookingHelper.accessor('serviceId', {
        header: () => t('filterService'),
        cell: (info) => <KitStatusBadge tone="neutral" label={info.getValue()} />,
      }),
      bookingHelper.accessor('doctorName', { header: () => t('aiDoctor') }),
      bookingHelper.accessor('status', {
        header: () => t('colStatus'),
        cell: (info) => <KitStatusBadge tone="neutral" label={info.getValue()} />,
      }),
    ],
    [t],
  )

  const tabs: { id: ProfileTab; label: string }[] = [
    { id: 'overview', label: t('tabOverview') },
    { id: 'conversations', label: t('tabConversations') },
    { id: 'bookings', label: t('tabBookings') },
    { id: 'attachments', label: t('tabAttachments') },
    { id: 'notes', label: t('tabNotes') },
  ]

  const openConversationHref = data?.conversations[0]
    ? ROUTES.INBOX.thread(data.conversations[0].id)
    : ROUTES.INBOX.ALL

  const refresh = () => customer.refetch()

  const commitTags = async (next: string[]) => {
    if (!data) return
    await actions.setTags(data.id, next)
    notify.success({ title: t('tagSuccess') })
    refresh()
  }

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader
        title={t('profileTitle')}
        description={data?.displayName}
        primaryActions={
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" asChild>
              <Link to={ROUTES.CUSTOMERS.LIST}>{t('backToList')}</Link>
            </Button>
            <Button type="button" variant="outline" onClick={() => setDrawerOpen(true)}>
              <Pencil className="size-4" />
              {t('edit')}
            </Button>
          </div>
        }
      />

      {customer.isLoading ? (
        <p className="text-muted-foreground text-sm">…</p>
      ) : customer.error ? (
        <div className="space-y-2">
          <p className="text-destructive text-sm">{String(customer.error)}</p>
          <Button type="button" variant="outline" onClick={refresh}>
            Retry
          </Button>
        </div>
      ) : data ? (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-4">
            <section className="rounded-card border border-border bg-card p-4">
              <div className="flex flex-wrap items-start gap-4">
                <KitAvatar name={data.displayName} size="lg" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div>
                    <h2 className="text-lg font-semibold">{data.displayName}</h2>
                    <p className="text-muted-foreground text-sm tabular-nums">{data.phone}</p>
                    {data.email ? (
                      <p className="text-muted-foreground text-sm">{data.email}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {data.channels.map((ch) => (
                      <KitChannelBadge
                        key={`${ch.channelType}-${ch.externalId}`}
                        channel={ch.channelType}
                      />
                    ))}
                    <KitStatusBadge
                      tone={
                        data.status === 'active'
                          ? 'success'
                          : data.status === 'blocked'
                            ? 'danger'
                            : 'neutral'
                      }
                      label={
                        data.status === 'active'
                          ? t('statusActive')
                          : data.status === 'blocked'
                            ? t('statusBlocked')
                            : t('statusInactive')
                      }
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <KitTagsCell tags={data.tags} maxVisible={6} />
                    <form
                      className="flex gap-1"
                      onSubmit={(e) => {
                        e.preventDefault()
                        const next = tagDraft.trim()
                        if (!next) return
                        void commitTags([...new Set([...data.tags, next])])
                        setTagDraft('')
                      }}
                    >
                      <Input
                        className="h-8 w-28"
                        value={tagDraft}
                        onChange={(e) => setTagDraft(e.target.value)}
                        placeholder={t('addTag')}
                      />
                      <Button type="submit" size="sm" variant="outline">
                        +
                      </Button>
                    </form>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <Link to={openConversationHref}>
                        <MessageSquare className="size-4" />
                        {t('openConversation')}
                      </Link>
                    </Button>
                    <Button type="button" size="sm" asChild>
                      <Link to={ROUTES.BOOKINGS.LIST}>
                        <CalendarPlus className="size-4" />
                        {t('newBooking')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap gap-2">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    'inline-flex items-center rounded-full border px-3 py-1.5 text-xs',
                    tab === item.id
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {tab === 'overview' ? (
              <div className="space-y-4">
                <StatsStrip>
                  <StatCard icon={CalendarDays} label={t('colBookings')} value={data.totalBookings} />
                  <StatCard
                    icon={MessagesSquare}
                    label={t('colConversations')}
                    value={data.totalConversations}
                  />
                  <StatCard icon={Star} label={t('colSatisfaction')} value={data.satisfaction} />
                  <StatCard
                    icon={HeartHandshake}
                    label={t('statInsurance')}
                    value={data.hasInsurance ? 1 : 0}
                  />
                </StatsStrip>
                <section className="rounded-card border border-border bg-card p-4">
                  <h3 className="mb-3 text-sm font-medium">{t('timeline')}</h3>
                  <ul className="space-y-3">
                    {data.activity.map((event) => (
                      <li key={event.id} className="flex items-start justify-between gap-3 text-sm">
                        <span>{event.title}</span>
                        <KitRelativeTimeCell date={event.at} />
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            ) : null}

            {tab === 'conversations' ? (
              <KitDataTable
                columns={convColumns}
                data={data.conversations}
                getRowId={(row) => row.id}
                hideToolbar
                hidePagination
                urlStateKey={`customer-conv-${data.id}`}
                emptyMessage={t('emptyConversations')}
                onRowClick={(row) => navigate(ROUTES.INBOX.thread(row.id))}
              />
            ) : null}

            {tab === 'bookings' ? (
              <KitDataTable
                columns={bookingColumns}
                data={data.bookings}
                getRowId={(row) => row.id}
                hideToolbar
                hidePagination
                urlStateKey={`customer-bk-${data.id}`}
                emptyMessage={t('emptyBookings')}
              />
            ) : null}

            {tab === 'attachments' ? (
              data.attachments.length === 0 ? (
                <p className="text-muted-foreground text-sm">{t('emptyAttachments')}</p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {data.attachments.map((att) => (
                    <button
                      key={att.id}
                      type="button"
                      className="rounded-card border border-border bg-card p-2 text-start transition hover:border-primary/40"
                      onClick={() => setLightbox(att)}
                    >
                      <img
                        src={att.url}
                        alt={att.label}
                        className="mb-2 aspect-square w-full rounded-control object-cover"
                      />
                      <p className="truncate text-xs font-medium">{att.label}</p>
                      <p className="text-muted-foreground text-[11px]">{att.kind}</p>
                    </button>
                  ))}
                </div>
              )
            ) : null}

            {tab === 'notes' ? (
              <div className="space-y-3">
                <form
                  className="flex flex-col gap-2 sm:flex-row"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!noteBody.trim()) return
                    void actions.addNote(data.id, noteBody.trim()).then(() => {
                      setNoteBody('')
                      refresh()
                    })
                  }}
                >
                  <Textarea
                    value={noteBody}
                    onChange={(e) => setNoteBody(e.target.value)}
                    placeholder={t('notePlaceholder')}
                    className="min-h-20"
                  />
                  <Button type="submit">{t('addNote')}</Button>
                </form>
                {data.notes.length === 0 ? (
                  <p className="text-muted-foreground text-sm">{t('emptyNotes')}</p>
                ) : (
                  <ul className="space-y-2">
                    {data.notes.map((note) => (
                      <li
                        key={note.id}
                        className={cn(
                          'rounded-card border border-border bg-card p-3',
                          note.pinned && 'border-primary/30',
                        )}
                      >
                        {editingNoteId === note.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editingNoteBody}
                              onChange={(e) => setEditingNoteBody(e.target.value)}
                            />
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => {
                                  void actions
                                    .updateNote(data.id, note.id, editingNoteBody)
                                    .then(() => {
                                      setEditingNoteId(null)
                                      refresh()
                                    })
                                }}
                              >
                                {t('saveNote')}
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingNoteId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm whitespace-pre-wrap">{note.body}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <KitRelativeTimeCell date={note.updatedAt} />
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setEditingNoteId(note.id)
                                  setEditingNoteBody(note.body)
                                }}
                              >
                                {t('editNote')}
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  void actions.pinNote(data.id, note.id, !note.pinned).then(refresh)
                                }}
                              >
                                <Pin className="size-3.5" />
                                {note.pinned ? t('unpinNote') : t('pinNote')}
                              </Button>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </div>

          <aside className="rounded-card border border-ai/30 bg-ai-soft/40 p-4 h-fit space-y-3">
            <div className="flex items-center gap-2 text-ai">
              <Sparkles className="size-4" />
              <h3 className="text-sm font-semibold">{t('aiKnowsTitle')}</h3>
            </div>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs">{t('aiPreferences')}</dt>
                <dd>{data.aiProfile.preferences}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">{t('aiDoctor')}</dt>
                <dd>{data.aiProfile.frequentDoctorName ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">{t('aiLanguage')}</dt>
                <dd>{data.aiProfile.language}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">{t('aiIntent')}</dt>
                <dd>{data.aiProfile.lastIntent ?? '—'}</dd>
              </div>
            </dl>
          </aside>
        </div>
      ) : null}

      <CustomerDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        customer={data}
        onSaved={refresh}
      />

      <KitLightbox
        open={Boolean(lightbox)}
        onOpenChange={(open) => {
          if (!open) setLightbox(null)
        }}
        url={lightbox?.url}
        title={lightbox?.label ?? ''}
      />
    </div>
  )
}
