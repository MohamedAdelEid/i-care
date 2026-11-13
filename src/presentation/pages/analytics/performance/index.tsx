import { MessagesSquare, Percent, Timer, Bot } from 'lucide-react'
import { useEffect } from 'react'

import { useAnalyticsPerformanceView } from '@/application/hooks'
import { exportVisibleRowsToCsv } from '@/presentation/components/kit/data-table/export-csv'
import {
  AreaTrendChart,
  RadialProgress,
  RoundedBarChart,
  StatsStrip,
  StatCard,
} from '@/presentation/components/kit'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { useAnalyticsShell } from '../analytics-shell'

export const AnalyticsPerformancePage = () => {
  const { t } = useTranslation('analytics')
  const { range, registerExporter } = useAnalyticsShell()
  const query = useAnalyticsPerformanceView(range)

  useEffect(() => {
    if (!query.data) {
      registerExporter(null)
      return
    }
    const data = query.data
    registerExporter(() => {
      const stamp = new Date().toISOString().slice(0, 10)
      exportVisibleRowsToCsv(
        ['metric', 'value'],
        [
          { metric: 'conversationsTotal', value: data.stats.conversationsTotal },
          { metric: 'avgFirstResponseMs', value: data.stats.avgFirstResponseMs },
          { metric: 'resolutionRate', value: data.stats.resolutionRate },
          { metric: 'containmentRate', value: data.containmentRate },
          ...data.aiHumanSeries.map((row) => ({
            metric: `aiHuman:${row.label}`,
            value: `${row.ai}/${row.human}`,
          })),
        ],
        (row) => [row.metric, row.value],
        `i-care-analytics-performance-${stamp}.csv`,
      )
    })
    return () => registerExporter(null)
  }, [query.data, registerExporter])

  const data = query.data

  return (
    <AsyncBoundary isLoading={query.isLoading} error={query.error} onRetry={query.refetch}>
      {data ? (
        <div className="space-y-5">
          <StatsStrip>
            <StatCard
              label={t('statConversations')}
              value={data.stats.conversationsTotal}
              icon={MessagesSquare}
            />
            <StatCard
              label={t('statFirstResponse')}
              value={`${Math.round(data.stats.avgFirstResponseMs / 1000)}s`}
              icon={Timer}
            />
            <StatCard
              label={t('statResolution')}
              value={`${Math.round(data.stats.resolutionRate * 100)}%`}
              icon={Percent}
            />
            <StatCard
              label={t('statAiDeflection')}
              value={`${Math.round(data.stats.aiDeflectionRate * 100)}%`}
              icon={Bot}
            />
          </StatsStrip>

          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <AreaTrendChart
              ariaLabel={t('chartAiHuman')}
              data={data.aiHumanSeries}
              series={[
                { key: 'ai', name: t('seriesAi') },
                { key: 'human', name: t('seriesHuman') },
              ]}
            />
            <div className="flex flex-col items-center justify-center rounded-card border border-border bg-card p-4">
              <RadialProgress
                value={Math.round(data.containmentRate * 100)}
                ariaLabel={t('chartContainment')}
                label={t('chartContainment')}
              />
            </div>
          </div>

          <RoundedBarChart
            ariaLabel={t('chartResponseByHour')}
            data={data.responseByHour}
          />
        </div>
      ) : null}
    </AsyncBoundary>
  )
}
