/** Legacy analytics read models (seed + Analytics pages). */

export type PerformanceSnapshot = {
  period: string
  conversationsTotal: number
  avgFirstResponseMs: number
  resolutionRate: number
  aiDeflectionRate: number
}

export type InsightPoint = {
  label: string
  value: number
  delta?: number
  series: number[]
}

export type UnansweredStatus = 'open' | 'dismissed' | 'added_to_kb'

export type UnansweredTopic = {
  id: string
  topic: string
  question: string
  count: number
  lastAskedAt: string
  channel: 'whatsapp' | 'telegram'
  suggestedAnswer: string
  status: UnansweredStatus
  sampleUtterances: string[]
}

export type CsatBucket = {
  label: string
  value: number
}

export type CsatComment = {
  id: string
  rating: number
  comment: string
  sentiment: 'positive' | 'neutral' | 'negative'
  at: string
  channel: 'whatsapp' | 'telegram'
}

export type CsatSummary = {
  score: number
  responseCount: number
  distribution: CsatBucket[]
  trend: { label: string; value: number }[]
  comments: CsatComment[]
}

export type AnalyticsPerformanceView = {
  stats: PerformanceSnapshot
  aiHumanSeries: { label: string; ai: number; human: number }[]
  responseByHour: { label: string; value: number }[]
  containmentRate: number
}

export type AbandonedStepRow = {
  id: string
  serviceId: string
  stepLabel: string
  abandonCount: number
  dropOffPercent: number
}

export type AnalyticsInsightsView = {
  topics: ChartShare[]
  topicTrend: { label: string; value: number }[]
  busyHeatmap: BusyHeatCell[]
  serviceFunnels: { serviceId: string; label: string; steps: { label: string; value: number }[] }[]
  abandonedSteps: AbandonedStepRow[]
}

export type ChartShare = {
  label: string
  value: number
}

/** Overview control-room read models (Phase 9.3). */

export type OverviewDatePreset = 'today' | '7d' | '30d' | 'custom'

export type OverviewDateRange = {
  preset: OverviewDatePreset
  from?: string
  to?: string
}

export type OverviewStatTrend = {
  direction: 'up' | 'down' | 'neutral'
  value: string
}

export type OverviewKpi = {
  value: number
  sparkline: number[]
  trend: OverviewStatTrend
  format?: 'number' | 'percent' | 'minutes' | 'score'
}

export type OverviewStats = {
  activeConversations: OverviewKpi
  resolvedByAiPercent: OverviewKpi
  waitingHuman: OverviewKpi
  avgFirstResponseMinutes: OverviewKpi
  csat: OverviewKpi
}

export type ChannelVolumePoint = {
  date: string
  label: string
  whatsapp: number
  telegram: number
}

export type AiHumanSplit = {
  aiPercent: number
  humanPercent: number
  aiCount: number
  humanCount: number
}

export type ServiceMixItem = {
  id: string
  labelKey: string
  value: number
}

export type BookingFunnelStep = {
  id: string
  labelKey: string
  value: number
}

/** dayIndex 0=Sat … 6=Fri; slotIndex 0=09–12 … 3=18–21; Friday closed. */
export type BusyHeatCell = {
  dayIndex: number
  slotIndex: number
  intensity: number
  closed?: boolean
}

export type LiveConversationItem = {
  id: string
  customerName: string
  preview: string
  channel: 'whatsapp' | 'telegram'
  handledBy: 'ai' | 'human'
  relativeMinutesAgo: number
}

export type HandoffDepartment = 'call_center' | 'results' | 'contracts'

export type HandoffQueueItem = {
  department: HandoffDepartment
  waitingCount: number
  oldestWaitMinutes: number
  slaTone: 'ok' | 'warning' | 'critical'
}

export type UnansweredQuestionItem = {
  id: string
  question: string
  count: number
}

export type OverviewEscalationRow = {
  id: string
  subject: string
  priority: string
  status: string
  department: string
  createdAt: string
}

export type OverviewDashboard = {
  range: OverviewDateRange
  liveAiHandledCount: number
  stats: OverviewStats
  channelVolume: ChannelVolumePoint[]
  aiHumanSplit: AiHumanSplit
  serviceMix: ServiceMixItem[]
  bookingFunnel: BookingFunnelStep[]
  busyHeatmap: BusyHeatCell[]
  handoffQueues: HandoffQueueItem[]
  recentEscalations: OverviewEscalationRow[]
  unansweredQuestions: UnansweredQuestionItem[]
}
