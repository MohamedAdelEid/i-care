import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import type { AiInsight, BookingDraft, Conversation, Customer } from '@/domain/entities'
import { KitStatusBadge, KitTagsCell } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { cn } from '@/presentation/utils'

import { serviceI18nKey } from './service-label'

type ContextTab = 'customer' | 'booking' | 'ai'

export interface ContextPanelProps {
  conversation: Conversation | null
  customer: Customer | null
  bookingDraft: BookingDraft | null
  aiInsight: AiInsight | null
  previous: Conversation[]
  isLoading?: boolean
  onConfirmBooking?: () => void
  onEditBooking?: () => void
  onClose?: () => void
  showClose?: boolean
}

export const ContextPanel = ({
  conversation,
  customer,
  bookingDraft,
  aiInsight,
  previous,
  isLoading,
  onConfirmBooking,
  onEditBooking,
  onClose,
  showClose,
}: ContextPanelProps) => {
  const { t } = useTranslation('inbox')
  const [tab, setTab] = useState<ContextTab>('customer')

  const tabs = useMemo(
    () =>
      [
        { id: 'customer' as const, label: t('customerTab') },
        { id: 'booking' as const, label: t('bookingTab') },
        { id: 'ai' as const, label: t('aiInsightTab') },
      ] as const,
    [t],
  )

  const confirmationLabel = (state: BookingDraft['confirmationState']) => {
    if (state === 'awaiting_confirm') return t('confirmationAwaiting')
    if (state === 'confirmed') return t('confirmationConfirmed')
    if (state === 'editing') return t('confirmationEditing')
    return t('confirmationCollecting')
  }

  return (
    <aside className="flex h-full min-h-0 flex-col border-s border-border bg-card">
      <div className="flex items-center gap-1 border-b border-border p-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              'rounded-control px-2.5 py-1.5 text-xs font-medium transition-colors',
              tab === item.id
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted/50',
            )}
          >
            {item.label}
          </button>
        ))}
        {showClose ? (
          <Button type="button" size="sm" variant="ghost" className="ms-auto" onClick={onClose}>
            {t('backToList')}
          </Button>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {!conversation || isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : tab === 'customer' ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold">
                {customer?.displayName ?? conversation.customerName}
              </h3>
              <p className="text-muted-foreground mt-1 text-xs">
                {t('phone')}: {customer?.phone ?? '—'}
              </p>
              <p className="text-muted-foreground text-xs">
                {t('channel')}: {conversation.channelType}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium">{t('tags')}</p>
              <KitTagsCell tags={customer?.tags?.length ? customer.tags : conversation.tags ?? []} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium">{t('previousConversations')}</p>
              <ul className="space-y-2">
                {previous.slice(0, 5).map((item) => (
                  <li key={item.id}>
                    <Link
                      to={ROUTES.INBOX.thread(item.id)}
                      className="text-primary block truncate text-xs hover:underline"
                    >
                      {item.subject ?? item.id}
                    </Link>
                  </li>
                ))}
                {!previous.length ? (
                  <p className="text-muted-foreground text-xs">{t('noNotes')}</p>
                ) : null}
              </ul>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium">{t('notes')}</p>
              <p className="text-muted-foreground text-xs">{t('noNotes')}</p>
            </div>
          </div>
        ) : tab === 'booking' ? (
          bookingDraft ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">
                  {t('bookingStep', {
                    current: bookingDraft.stepIndex,
                    total: bookingDraft.stepTotal,
                  })}
                </p>
                <KitStatusBadge
                  tone={
                    bookingDraft.confirmationState === 'confirmed'
                      ? 'success'
                      : bookingDraft.confirmationState === 'awaiting_confirm'
                        ? 'warning'
                        : 'neutral'
                  }
                  label={confirmationLabel(bookingDraft.confirmationState)}
                />
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="bg-primary h-full transition-[width]"
                  style={{
                    width: `${(bookingDraft.stepIndex / bookingDraft.stepTotal) * 100}%`,
                  }}
                />
              </div>
              <dl className="space-y-2 text-sm">
                {(
                  [
                    ['fieldName', bookingDraft.fourPartName],
                    ['fieldPhone', bookingDraft.phone],
                    [
                      'fieldService',
                      bookingDraft.serviceId
                        ? t(serviceI18nKey(bookingDraft.serviceId))
                        : undefined,
                    ],
                    ['fieldDoctor', bookingDraft.doctorDegree],
                    ['fieldDay', bookingDraft.day],
                    ['fieldSlot', bookingDraft.timeSlot],
                    ['fieldCost', bookingDraft.estimatedCost],
                    [
                      'fieldAttachments',
                      bookingDraft.attachmentCount
                        ? String(bookingDraft.attachmentCount)
                        : undefined,
                    ],
                  ] as const
                ).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-3 border-b border-border/60 py-1.5">
                    <dt className="text-muted-foreground text-xs">{t(key)}</dt>
                    <dd className="text-end text-xs font-medium">{value ?? '—'}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex gap-2">
                <Button type="button" size="sm" onClick={onConfirmBooking}>
                  {t('confirmBooking')}
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={onEditBooking}>
                  {t('editBooking')}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">{t('emptySelectHint')}</p>
          )
        ) : aiInsight ? (
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">{t('intent')}</p>
              <p className="font-medium">{aiInsight.intent}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">{t('confidence')}</p>
              <p className="font-medium tabular-nums">
                {Math.round(aiInsight.confidence * 100)}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">{t('reasoning')}</p>
              <p>{aiInsight.reasoningSummary}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-xs">{t('toolsUsed')}</p>
              <div className="flex flex-wrap gap-1">
                {aiInsight.toolsUsed.map((tool) => (
                  <KitStatusBadge key={tool} tone="ai" label={tool} />
                ))}
              </div>
            </div>
            {aiInsight.handoffReason ? (
              <div>
                <p className="text-muted-foreground text-xs">{t('handoffReason')}</p>
                <p>{aiInsight.handoffReason}</p>
              </div>
            ) : null}
            {aiInsight.handoffDepartment ? (
              <div>
                <p className="text-muted-foreground text-xs">{t('handoffDept')}</p>
                <p>
                  {aiInsight.handoffDepartment === 'call_center'
                    ? t('deptCallCenter')
                    : aiInsight.handoffDepartment === 'contracts'
                      ? t('deptContracts')
                      : t('deptResults')}
                </p>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">{t('emptySelectHint')}</p>
        )}
      </div>
    </aside>
  )
}
