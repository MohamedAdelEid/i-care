import { createColumnHelper } from '@tanstack/react-table'
import { MessageSquareText, Star } from 'lucide-react'
import { useEffect, useMemo } from 'react'

import { useAnalyticsCsat } from '@/application/hooks'
import type { CsatComment } from '@/domain/entities'
import { exportVisibleRowsToCsv } from '@/presentation/components/kit/data-table/export-csv'
import {
  AreaTrendChart,
  KitChannelBadge,
  KitDataTable,
  KitRelativeTimeCell,
  KitStatusBadge,
  RoundedBarChart,
  StatCard,
  StatsStrip,
} from '@/presentation/components/kit'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { useAnalyticsShell } from '../analytics-shell'

const columnHelper = createColumnHelper<CsatComment>()

export const AnalyticsCsatPage = () => {
  const { t } = useTranslation('analytics')
  const { registerExporter } = useAnalyticsShell()
  const query = useAnalyticsCsat()

  useEffect(() => {
    if (!query.data) {
      registerExporter(null)
      return
    }
    const data = query.data
    registerExporter(() => {
      const stamp = new Date().toISOString().slice(0, 10)
      exportVisibleRowsToCsv(
        ['id', 'rating', 'sentiment', 'comment', 'channel', 'at'],
        data.comments,
        (row) => [row.id, row.rating, row.sentiment, row.comment, row.channel, row.at],
        `i-care-analytics-csat-${stamp}.csv`,
      )
    })
    return () => registerExporter(null)
  }, [query.data, registerExporter])

  const columns = useMemo(
    () => [
      columnHelper.accessor('rating', { header: () => t('colRating') }),
      columnHelper.accessor('comment', { header: () => t('colComment') }),
      columnHelper.accessor('sentiment', {
        header: () => t('colSentiment'),
        cell: (info) => {
          const value = info.getValue()
          return (
            <KitStatusBadge
              tone={value === 'positive' ? 'success' : value === 'negative' ? 'danger' : 'neutral'}
              label={t(`sentiment_${value}` as 'sentiment_positive')}
            />
          )
        },
      }),
      columnHelper.accessor('channel', {
        header: () => t('colChannel'),
        cell: (info) => <KitChannelBadge channel={info.getValue()} />,
      }),
      columnHelper.accessor('at', {
        header: () => t('colAskedAt'),
        cell: (info) => <KitRelativeTimeCell date={info.getValue()} />,
      }),
    ],
    [t],
  )

  const data = query.data

  return (
    <AsyncBoundary isLoading={query.isLoading} error={query.error} onRetry={query.refetch}>
      {data ? (
        <div className="space-y-5">
          <StatsStrip>
            <StatCard label={t('csatScore')} value={data.score.toFixed(1)} icon={Star} />
            <StatCard
              label={t('csatResponses')}
              value={data.responseCount}
              icon={MessageSquareText}
            />
          </StatsStrip>

          <div className="grid gap-4 lg:grid-cols-2">
            <AreaTrendChart
              ariaLabel={t('chartCsatTrend')}
              data={data.trend}
              series={[{ key: 'value', name: t('csatScore') }]}
            />
            <RoundedBarChart
              ariaLabel={t('chartCsatDistribution')}
              data={data.distribution.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
          </div>

          <KitDataTable
            columns={columns}
            data={data.comments}
            getRowId={(row) => row.id}
            emptyMessage={t('csatEmpty')}
          />
        </div>
      ) : null}
    </AsyncBoundary>
  )
}