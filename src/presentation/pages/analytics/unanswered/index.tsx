import { createColumnHelper } from '@tanstack/react-table'
import { BookPlus, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { useAnalyticsActions, useAnalyticsUnanswered } from '@/application/hooks'
import type { UnansweredTopic } from '@/domain/entities'
import { notify } from '@/infrastructure/libs/toast/toast'
import { exportVisibleRowsToCsv } from '@/presentation/components/kit/data-table/export-csv'
import {
  KitChannelBadge,
  KitDataTable,
  KitRelativeTimeCell,
  KitStatusBadge,
} from '@/presentation/components/kit'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { useAnalyticsShell } from '../analytics-shell'

const columnHelper = createColumnHelper<UnansweredTopic>()

export const AnalyticsUnansweredPage = () => {
  const { t } = useTranslation('analytics')
  const { registerExporter } = useAnalyticsShell()
  const query = useAnalyticsUnanswered()
  const { dismissUnanswered, addUnansweredToKnowledge } = useAnalyticsActions()
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const selectedIds = useMemo(
    () => Object.entries(selected).filter(([, v]) => v).map(([id]) => id),
    [selected],
  )

  useEffect(() => {
    if (!query.data) {
      registerExporter(null)
      return
    }
    const rows = query.data
    registerExporter(() => {
      const stamp = new Date().toISOString().slice(0, 10)
      exportVisibleRowsToCsv(
        ['question', 'count', 'channel', 'status', 'lastAskedAt'],
        rows,
        (row) => [row.question, row.count, row.channel, row.status, row.lastAskedAt],
        `i-care-analytics-unanswered-${stamp}.csv`,
      )
    })
    return () => registerExporter(null)
  }, [query.data, registerExporter])

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: () => t('colSelect'),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={Boolean(selected[row.original.id])}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, [row.original.id]: e.target.checked }))
            }
            aria-label={t('colSelect')}
          />
        ),
      }),
      columnHelper.accessor('question', {
        header: () => t('colQuestion'),
        cell: (info) => (
          <div className="max-w-md space-y-1">
            <p className="text-sm font-medium">{info.getValue()}</p>
            <KitStatusBadge
              tone="ai"
              variant="soft"
              label={t('suggestedAnswer')}
            />
            <p className="text-xs text-muted-foreground">{info.row.original.suggestedAnswer}</p>
          </div>
        ),
      }),
      columnHelper.accessor('count', { header: () => t('colCount') }),
      columnHelper.accessor('channel', {
        header: () => t('colChannel'),
        cell: (info) => <KitChannelBadge channel={info.getValue()} />,
      }),
      columnHelper.accessor('lastAskedAt', {
        header: () => t('colLastAsked'),
        cell: (info) => <KitRelativeTimeCell date={info.getValue()} />,
      }),
      columnHelper.accessor('status', {
        header: () => t('colStatus'),
        cell: (info) => (
          <KitStatusBadge
            tone={info.getValue() === 'added_to_kb' ? 'success' : 'warning'}
            label={t(`status_${info.getValue()}` as 'status_open')}
          />
        ),
      }),
    ],
    [selected, t],
  )

  const runBulk = async (action: 'dismiss' | 'kb') => {
    if (selectedIds.length === 0) return
    if (action === 'dismiss') await dismissUnanswered(selectedIds)
    else await addUnansweredToKnowledge(selectedIds)
    setSelected({})
    notify.success({
      title: action === 'dismiss' ? t('dismissed') : t('addedToKb'),
    })
    query.refetch()
  }

  return (
    <AsyncBoundary isLoading={query.isLoading} error={query.error} onRetry={query.refetch}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={selectedIds.length === 0}
            onClick={() => void runBulk('kb')}
          >
            <BookPlus className="size-3.5" aria-hidden />
            {t('addToKb')}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={selectedIds.length === 0}
            onClick={() => void runBulk('dismiss')}
          >
            <Trash2 className="size-3.5" aria-hidden />
            {t('dismiss')}
          </Button>
        </div>
        <KitDataTable
          columns={columns}
          data={query.data ?? []}
          getRowId={(row) => row.id}
          emptyMessage={t('unansweredEmpty')}
        />
      </div>
    </AsyncBoundary>
  )
}
