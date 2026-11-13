import type {
  AnalyticsInsightsView,
  AnalyticsPerformanceView,
  ChartShare,
  CsatSummary,
  InsightPoint,
  LiveConversationItem,
  OverviewDashboard,
  OverviewDateRange,
  PerformanceSnapshot,
  UnansweredTopic,
} from '@/domain/entities'
import type { Escalation } from '@/domain/entities'

export interface IAnalyticsRepository {
  getPerformance(): Promise<PerformanceSnapshot>
  getPerformanceView(range: OverviewDateRange): Promise<AnalyticsPerformanceView>
  getVolumeSeries(): Promise<number[]>
  getChannelMix(): Promise<ChartShare[]>
  getTopicMix(): Promise<ChartShare[]>
  getInsights(): Promise<InsightPoint[]>
  getInsightsView(range: OverviewDateRange): Promise<AnalyticsInsightsView>
  getUnanswered(): Promise<UnansweredTopic[]>
  dismissUnanswered(ids: string[]): Promise<void>
  addUnansweredToKnowledge(ids: string[]): Promise<void>
  getCsat(): Promise<CsatSummary>
  getRecentEscalations(): Promise<Escalation[]>
  getOverviewDashboard(range: OverviewDateRange): Promise<OverviewDashboard>
  getLiveFeed(): Promise<LiveConversationItem[]>
}
