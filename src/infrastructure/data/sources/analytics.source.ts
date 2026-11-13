import type {
  BusyHeatCell,
  ChannelVolumePoint,
  LiveConversationItem,
  OverviewDashboard,
  OverviewDateRange,
  OverviewKpi,
  OverviewStats,
} from '@/domain/entities'
import { memoryStore } from '@/infrastructure/data/memory-store'
import { delay } from '@/infrastructure/data/utils/source.utils'

const LIVE_NAMES = [
  'Layla Hassan',
  'عمر الفارسي',
  'Sara Alami',
  'Noura Qasim',
  'Faisal Rahman',
  'Hind Al-Mutairi',
  'Yousef Nasser',
  'Maya Haddad',
]

const LIVE_PREVIEWS = [
  'Can I book a retina check this week?',
  'هل لديكم مواعيد ليزر؟',
  'Insurance approval for OCT scan?',
  'Need to reschedule pediatric visit',
  'Where is the Riyadh clinic?',
  'Results for visual field test?',
  'Contract renewal for corporate plan',
  'Doctor available after 6pm?',
]

const hash = (input: string) => {
  let h = 0
  for (let i = 0; i < input.length; i += 1) h = (h * 31 + input.charCodeAt(i)) >>> 0
  return h
}

const mulberry32 = (seed: number) => {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const resolveDayCount = (range: OverviewDateRange): number => {
  if (range.preset === 'today') return 1
  if (range.preset === '30d') return 30
  if (range.preset === 'custom' && range.from && range.to) {
    const from = new Date(range.from)
    const to = new Date(range.to)
    const diff = Math.max(1, Math.round((to.getTime() - from.getTime()) / 86_400_000) + 1)
    return Math.min(diff, 90)
  }
  return 7
}

const sparkline = (rand: () => number, base: number, points = 8): number[] =>
  Array.from({ length: points }, (_, i) =>
    Math.max(0, Math.round(base * (0.75 + rand() * 0.5) + (i % 3) * 2)),
  )

const kpi = (
  rand: () => number,
  value: number,
  format?: OverviewKpi['format'],
): OverviewKpi => {
  const delta = Math.round((rand() - 0.45) * 18)
  const direction = delta > 2 ? 'up' : delta < -2 ? 'down' : 'neutral'
  return {
    value,
    sparkline: sparkline(rand, value),
    trend: {
      direction,
      value: `${delta > 0 ? '+' : ''}${delta}%`,
    },
    format,
  }
}

const buildStats = (rand: () => number, days: number): OverviewStats => {
  const scale = days === 1 ? 0.35 : days <= 7 ? 1 : 1.8
  return {
    activeConversations: kpi(rand, Math.round(42 * scale + rand() * 12), 'number'),
    resolvedByAiPercent: kpi(rand, Math.round(58 + rand() * 18), 'percent'),
    waitingHuman: kpi(rand, Math.round(6 * scale + rand() * 5), 'number'),
    avgFirstResponseMinutes: kpi(rand, Number((1.2 + rand() * 2.4).toFixed(1)), 'minutes'),
    csat: kpi(rand, Number((4.2 + rand() * 0.7).toFixed(1)), 'score'),
  }
}

const buildChannelVolume = (rand: () => number, days: number): ChannelVolumePoint[] => {
  const points: ChannelVolumePoint[] = []
  const end = new Date()
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(end)
    d.setDate(end.getDate() - i)
    const iso = d.toISOString().slice(0, 10)
    const whatsapp = Math.round(28 + rand() * 40 + (days === 1 ? 20 : 0))
    const telegram = Math.round(10 + rand() * 22)
    points.push({
      date: iso,
      label: days <= 7 ? d.toLocaleDateString('en', { weekday: 'short' }) : `${d.getMonth() + 1}/${d.getDate()}`,
      whatsapp,
      telegram,
    })
  }
  return points
}

const buildHeatmap = (rand: () => number): BusyHeatCell[] => {
  const cells: BusyHeatCell[] = []
  for (let day = 0; day < 7; day += 1) {
    const friday = day === 6
    for (let slot = 0; slot < 4; slot += 1) {
      cells.push({
        dayIndex: day,
        slotIndex: slot,
        intensity: friday ? 0 : Math.round(rand() * 100),
        closed: friday,
      })
    }
  }
  return cells
}

const buildOverviewDashboard = (range: OverviewDateRange): OverviewDashboard => {
  const days = resolveDayCount(range)
  const seed = hash(`${range.preset}:${range.from ?? ''}:${range.to ?? ''}:${days}`)
  const rand = mulberry32(seed)
  const aiPercent = Math.round(55 + rand() * 25)
  const aiCount = Math.round(120 * (days / 7) + rand() * 40)
  const humanCount = Math.round(aiCount * ((100 - aiPercent) / aiPercent))

  const escalations = memoryStore.escalations.slice(0, 5).map((item) => ({
    id: item.id,
    subject: item.reason || item.notes || 'Escalation',
    priority: item.priority,
    status: item.status,
    department: item.priority === 'high' ? 'call_center' : 'results',
    createdAt: item.openedAt,
  }))

  const unanswered = memoryStore.unanswered
    .filter((item) => item.status === 'open')
    .slice(0, 6)
    .map((item) => ({
      id: item.id,
      question: item.question,
      count: item.count,
    }))

  return {
    range,
    liveAiHandledCount: Math.round(18 + rand() * 14),
    stats: buildStats(rand, days),
    channelVolume: buildChannelVolume(rand, days),
    aiHumanSplit: {
      aiPercent,
      humanPercent: 100 - aiPercent,
      aiCount,
      humanCount,
    },
    serviceMix: [
      { id: 'retina', labelKey: 'serviceRetina', value: Math.round(90 + rand() * 40) },
      { id: 'lasik', labelKey: 'serviceLasik', value: Math.round(70 + rand() * 35) },
      { id: 'pediatric', labelKey: 'servicePediatric', value: Math.round(50 + rand() * 30) },
      { id: 'optics', labelKey: 'serviceOptics', value: Math.round(40 + rand() * 25) },
    ],
    bookingFunnel: [
      { id: 'intent', labelKey: 'funnelIntent', value: Math.round(220 + rand() * 40) },
      { id: 'slot', labelKey: 'funnelSlot', value: Math.round(160 + rand() * 30) },
      { id: 'confirm', labelKey: 'funnelConfirm', value: Math.round(120 + rand() * 25) },
      { id: 'booked', labelKey: 'funnelBooked', value: Math.round(90 + rand() * 20) },
    ],
    busyHeatmap: buildHeatmap(rand),
    handoffQueues: [
      {
        department: 'call_center',
        waitingCount: Math.round(3 + rand() * 6),
        oldestWaitMinutes: Math.round(4 + rand() * 18),
        slaTone: rand() > 0.7 ? 'warning' : 'ok',
      },
      {
        department: 'results',
        waitingCount: Math.round(1 + rand() * 4),
        oldestWaitMinutes: Math.round(2 + rand() * 12),
        slaTone: rand() > 0.85 ? 'critical' : 'ok',
      },
      {
        department: 'contracts',
        waitingCount: Math.round(rand() * 3),
        oldestWaitMinutes: Math.round(1 + rand() * 8),
        slaTone: 'ok',
      },
    ],
    recentEscalations: escalations,
    unansweredQuestions: unanswered,
  }
}

let liveTick = 0

const buildLiveFeed = (): LiveConversationItem[] => {
  liveTick += 1
  const rand = mulberry32(0xace1 + liveTick * 97)
  return Array.from({ length: 8 }, (_, i) => {
    const name = LIVE_NAMES[(i + liveTick) % LIVE_NAMES.length] ?? LIVE_NAMES[0]!
    const preview = LIVE_PREVIEWS[(i * 3 + liveTick) % LIVE_PREVIEWS.length] ?? LIVE_PREVIEWS[0]!
    return {
      id: `live-${liveTick}-${i}`,
      customerName: name,
      preview,
      channel: rand() > 0.35 ? 'whatsapp' : 'telegram',
      handledBy: rand() > 0.4 ? 'ai' : 'human',
      relativeMinutesAgo: Math.round(rand() * 28) + i,
    }
  })
}

export const analyticsSource = {
  async getPerformance() {
    await delay()
    return memoryStore.performance
  },
  async getPerformanceView(range: OverviewDateRange) {
    await delay(120)
    const days = resolveDayCount(range)
    const seed = hash(`perf:${range.preset}:${range.from ?? ''}:${range.to ?? ''}`)
    const rand = mulberry32(seed)
    const aiHumanSeries = Array.from({ length: Math.min(days, 14) }, (_, i) => ({
      label: `D${i + 1}`,
      ai: Math.round(40 + rand() * 35),
      human: Math.round(15 + rand() * 25),
    }))
    const responseByHour = Array.from({ length: 12 }, (_, i) => ({
      label: `${(i + 8).toString().padStart(2, '0')}:00`,
      value: Math.round(40 + rand() * 120),
    }))
    return {
      stats: memoryStore.performance,
      aiHumanSeries,
      responseByHour,
      containmentRate: memoryStore.performance.aiDeflectionRate,
    }
  },
  async getVolumeSeries() {
    await delay()
    return memoryStore.volumeSeries
  },
  async getChannelMix() {
    await delay()
    return memoryStore.channelMix
  },
  async getTopicMix() {
    await delay()
    return memoryStore.topicMix
  },
  async getInsights() {
    await delay()
    return memoryStore.insights
  },
  async getInsightsView(range: OverviewDateRange) {
    await delay(140)
    const seed = hash(`ins:${range.preset}:${range.from ?? ''}:${range.to ?? ''}`)
    const rand = mulberry32(seed)
    const services = ['retina', 'lasik', 'pediatric', 'optics', 'cataract']
    const serviceFunnels = services.map((serviceId) => {
      const base = 80 + Math.round(rand() * 40)
      const steps = [
        'Start',
        'Collect details',
        'Availability',
        'Cost',
        'Confirm',
        'Handoff',
      ].map((label, i) => ({
        label,
        value: Math.max(8, Math.round(base * (1 - i * 0.14) - rand() * 6)),
      }))
      return { serviceId, label: serviceId, steps }
    })
    const abandonedSteps = serviceFunnels.flatMap((funnel) => {
      const worst = funnel.steps
        .slice(1)
        .map((step, i) => {
          const prev = funnel.steps[i]!
          const drop = prev.value === 0 ? 0 : (prev.value - step.value) / prev.value
          return {
            id: `${funnel.serviceId}-${step.label}`,
            serviceId: funnel.serviceId,
            stepLabel: step.label,
            abandonCount: Math.max(0, prev.value - step.value),
            dropOffPercent: Math.round(drop * 100),
          }
        })
        .sort((a, b) => b.dropOffPercent - a.dropOffPercent)[0]
      return worst ? [worst] : []
    })
    const overview = buildOverviewDashboard(range)
    return {
      topics: memoryStore.topicMix,
      topicTrend: memoryStore.insights.map((item) => ({ label: item.label, value: item.value })),
      busyHeatmap: overview.busyHeatmap,
      serviceFunnels,
      abandonedSteps: abandonedSteps.sort((a, b) => b.abandonCount - a.abandonCount),
    }
  },
  async getUnanswered() {
    await delay()
    return memoryStore.unanswered.filter((item) => item.status !== 'dismissed')
  },
  async dismissUnanswered(ids: string[]) {
    await delay(80)
    memoryStore.unanswered = memoryStore.unanswered.map((item) =>
      ids.includes(item.id) ? { ...item, status: 'dismissed' } : item,
    )
  },
  async addUnansweredToKnowledge(ids: string[]) {
    await delay(100)
    memoryStore.unanswered = memoryStore.unanswered.map((item) =>
      ids.includes(item.id) ? { ...item, status: 'added_to_kb' } : item,
    )
    for (const id of ids) {
      const row = memoryStore.unanswered.find((item) => item.id === id)
      if (!row) continue
      memoryStore.knowledge.unshift({
        id: `kb-from-${id}`,
        title: row.question,
        body: row.suggestedAnswer,
        locale: 'en',
        tags: ['from-analytics', row.topic.toLowerCase()],
        updatedAt: new Date().toISOString(),
        kind: 'article',
        status: 'enabled',
        usageCount: 0,
        ownerName: 'Analytics',
        agentId: 'agent-eye-care',
      })
    }
  },
  async getCsat() {
    await delay()
    return memoryStore.csat
  },
  async getRecentEscalations() {
    await delay()
    return memoryStore.escalations.slice(0, 8)
  },
  async getOverviewDashboard(range: OverviewDateRange) {
    await delay(280)
    return buildOverviewDashboard(range)
  },
  async getLiveFeed() {
    await delay(120)
    return buildLiveFeed()
  },
}
