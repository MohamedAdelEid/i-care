import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

import { useAnalyticsInsightsView } from '@/application/hooks'
import type { AbandonedStepRow } from '@/domain/entities'
import { exportVisibleRowsToCsv } from '@/presentation/components/kit/data-table/export-csv'
import {
  DonutChart,
  FunnelChart,
  Heatmap,
  KitDataTable,
  RoundedBarChart,
} from '@/presentation/components/kit'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { useAnalyticsShell } from '../analytics-shell'

const columnHelper = createColumnHelper<AbandonedStepRow>()

export const AnalyticsInsightsPage = () => {
  const { t } = useTranslation('analytics')
  const { range, registerExporter } = useAnalyticsShell()
  const query = useAnalyticsInsightsView(range)
  const [funnelIndex, setFunnelIndex] = useState(0)

  useEffect(() => {
    if (!query.data) {
      registerExporter(null)
      return
    }
    const data = query.data
    registerExporter(() => {
      const stamp = new Date().toISOString().slice(0, 10)
      exportVisibleRowsToCsv(
        ['section', 'label', 'value'],
        [
          ...data.topics.map((row) => ({
            section: 'topic',
            label: row.label,
            value: row.value,
          })),
          ...data.abandonedSteps.map((row) => ({
            section: 'abandoned',
            label: `${row.serviceId}:${row.stepLabel}`,
            value: row.abandonCount,
          })),
        ],
        (row) => [row.section, row.label, row.value],
        `i-care-analytics-insights-${stamp}.csv`,
      )
    })
    return () => registerExporter(null)
  }, [query.data, registerExporter])

  const columns = useMemo(
    () => [
      columnHelper.accessor('serviceId', { header: () => t('colService') }),
      columnHelper.accessor('stepLabel', { header: () => t('colStep') }),
      columnHelper.accessor('abandonCount', { header: () => t('colAbandonCount') }),
      columnHelper.accessor('dropOffPercent', {
        header: () => t('colDropOff'),
        cell: (info) => `${info.getValue()}%`,
      }),
    ],
    [t],
  )

  const data = query.data
  const funnel = data?.serviceFunnels[funnelIndex] ?? data?.serviceFunnels[0]

  return (
    <AsyncBoundary isLoading={query.isLoading} error={query.error} onRetry={query.refetch}>
      {data ? (
        <div className="space-y-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <DonutChart
              ariaLabel={t('chartTopics')}
              data={data.topics.map((item) => ({
                name: item.label,
                value: item.value,
              }))}
            />
            <RoundedBarChart ariaLabel={t('chartTopicTrend')} data={data.topicTrend} />
          </div>

          <Heatmap
            ariaLabel={t('chartBusy')}
            cells={data.busyHeatmap.map((cell) => ({
              day: cell.dayIndex,
              hour: cell.slotIndex,
              intensity: cell.intensity,
              closed: cell.closed,
            }))}
            dayLabels={[
              t('daySat'),
              t('daySun'),
              t('dayMon'),
              t('dayTue'),
              t('dayWed'),
              t('dayThu'),
              t('dayFri'),
            ]}
            slotLabels={[t('slotMorning'), t('slotMidday'), t('slotAfternoon'), t('slotEvening')]}
            closedDays={[6]}
          />

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {data.serviceFunnels.map((item, index) => (
                <button
                  key={item.serviceId}
                  type="button"
                  className={
                    index === funnelIndex
                      ? 'rounded-full border border-primary bg-primary px-3 py-1 text-sm text-primary-foreground'
                      : 'rounded-full border border-border px-3 py-1 text-sm text-muted-foreground'
                  }
                  onClick={() => setFunnelIndex(index)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {funnel ? (
              <FunnelChart ariaLabel={t('chartFunnel')} steps={funnel.steps} />
            ) : null}
          </div>

          <KitDataTable
            columns={columns}
            data={data.abandonedSteps}
            getRowId={(row) => row.id}
            emptyMessage={t('abandonedEmpty')}
          />
        </div>
      ) : null}
    </AsyncBoundary>
  )
}
