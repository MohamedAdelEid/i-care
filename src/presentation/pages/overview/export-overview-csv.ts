import type { OverviewDashboard } from '@/domain/entities'
import { exportVisibleRowsToCsv } from '@/presentation/components/kit/data-table/export-csv'

export const downloadOverviewCsv = (dashboard: OverviewDashboard): void => {
  const stamp = new Date().toISOString().slice(0, 10)
  const rows: { section: string; metric: string; value: string | number }[] = [
    { section: 'stats', metric: 'activeConversations', value: dashboard.stats.activeConversations.value },
    {
      section: 'stats',
      metric: 'resolvedByAiPercent',
      value: dashboard.stats.resolvedByAiPercent.value,
    },
    { section: 'stats', metric: 'waitingHuman', value: dashboard.stats.waitingHuman.value },
    {
      section: 'stats',
      metric: 'avgFirstResponseMinutes',
      value: dashboard.stats.avgFirstResponseMinutes.value,
    },
    { section: 'stats', metric: 'csat', value: dashboard.stats.csat.value },
    { section: 'meta', metric: 'liveAiHandledCount', value: dashboard.liveAiHandledCount },
    { section: 'meta', metric: 'rangePreset', value: dashboard.range.preset },
  ]

  for (const step of dashboard.bookingFunnel) {
    rows.push({ section: 'funnel', metric: step.id, value: step.value })
  }
  for (const q of dashboard.unansweredQuestions) {
    rows.push({ section: 'unanswered', metric: q.question, value: q.count })
  }

  exportVisibleRowsToCsv(
    ['section', 'metric', 'value'],
    rows,
    (row) => [row.section, row.metric, row.value],
    `i-care-overview-${stamp}.csv`,
  )
}
