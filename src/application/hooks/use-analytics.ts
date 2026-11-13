import { useAsync } from '@/application/hooks/use-async'
import { repositories } from '@/composition/repositories'
import type { OverviewDateRange } from '@/domain/entities'

export const useAnalyticsPerformance = () =>
  useAsync(() => repositories.analytics.getPerformance(), [])

export const useAnalyticsPerformanceView = (range: OverviewDateRange) => {
  const key = JSON.stringify(range)
  return useAsync(() => repositories.analytics.getPerformanceView(range), [key])
}

export const useAnalyticsInsights = () => useAsync(() => repositories.analytics.getInsights(), [])

export const useAnalyticsInsightsView = (range: OverviewDateRange) => {
  const key = JSON.stringify(range)
  return useAsync(() => repositories.analytics.getInsightsView(range), [key])
}

export const useAnalyticsUnanswered = () =>
  useAsync(() => repositories.analytics.getUnanswered(), [])

export const useAnalyticsCsat = () => useAsync(() => repositories.analytics.getCsat(), [])
