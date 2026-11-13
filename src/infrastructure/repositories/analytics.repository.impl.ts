import type { OverviewDateRange } from '@/domain/entities'
import type { IAnalyticsRepository } from '@/domain/repositories/analytics.repository'
import { analyticsSource } from '@/infrastructure/data/sources/analytics.source'

export class AnalyticsRepository implements IAnalyticsRepository {
  getPerformance = analyticsSource.getPerformance
  getPerformanceView = analyticsSource.getPerformanceView
  getVolumeSeries = analyticsSource.getVolumeSeries
  getChannelMix = analyticsSource.getChannelMix
  getTopicMix = analyticsSource.getTopicMix
  getInsights = analyticsSource.getInsights
  getInsightsView = analyticsSource.getInsightsView
  getUnanswered = analyticsSource.getUnanswered
  dismissUnanswered = analyticsSource.dismissUnanswered
  addUnansweredToKnowledge = analyticsSource.addUnansweredToKnowledge
  getCsat = analyticsSource.getCsat
  getRecentEscalations = analyticsSource.getRecentEscalations
  getOverviewDashboard = (range: OverviewDateRange) => analyticsSource.getOverviewDashboard(range)
  getLiveFeed = analyticsSource.getLiveFeed
}
