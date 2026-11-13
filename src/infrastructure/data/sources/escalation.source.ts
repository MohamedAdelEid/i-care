import type { Escalation, HandoffStats, HandoffTabCounts } from '@/domain/entities'
import { EscalationStatus } from '@/domain/enums'
import type { EscalationPriority } from '@/domain/enums'
import type { EscalationListFilters } from '@/domain/repositories/escalation.repository'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'
import { memoryStore, upsertEscalation } from '@/infrastructure/data/memory-store'
import { delay, filterBySearch, paginate } from '@/infrastructure/data/utils/source.utils'

const CURRENT_USER = 'user-supervisor'

const applyFilters = (filters?: EscalationListFilters) => {
  let items = [...memoryStore.escalations]
  if (filters?.status === 'open') {
    items = items.filter((item) => item.status === EscalationStatus.Open)
  } else if (filters?.status === 'resolved') {
    items = items.filter((item) => item.status === EscalationStatus.Resolved)
  } else if (filters?.status === 'my') {
    items = items.filter((item) => item.assignedUserId === CURRENT_USER)
  }
  if (filters?.department && filters.department !== 'all') {
    items = items.filter((item) => item.department === filters.department)
  }
  if (filters?.serviceId) {
    items = items.filter((item) => item.serviceId === filters.serviceId)
  }
  if (filters?.priority) {
    items = items.filter((item) => item.priority === filters.priority)
  }
  if (filters?.assigneeId) {
    items = items.filter((item) => item.assignedUserId === filters.assigneeId)
  }
  if (filters?.slaState === 'breached' || filters?.slaState === 'critical') {
    items = items.filter((item) => item.slaTone === 'critical')
  } else if (filters?.slaState === 'warning') {
    items = items.filter((item) => item.slaTone === 'warning')
  } else if (filters?.slaState === 'ok') {
    items = items.filter((item) => item.slaTone === 'ok')
  }
  if (filters?.from) {
    const from = new Date(filters.from).getTime()
    items = items.filter((item) => new Date(item.openedAt).getTime() >= from)
  }
  if (filters?.to) {
    const to = new Date(filters.to).getTime()
    items = items.filter((item) => new Date(item.openedAt).getTime() <= to)
  }
  items = filterBySearch(items, filters?.search, ['customerName', 'reason', 'aiSummary'])
  return items.sort((a, b) => new Date(b.openedAt).getTime() - new Date(a.openedAt).getTime())
}

const pushTimeline = (item: Escalation, label: string): Escalation => ({
  ...item,
  timeline: [
    ...(item.timeline ?? []),
    { id: `tl-${item.id}-${Date.now()}`, at: new Date().toISOString(), label },
  ],
})

export const escalationSource = {
  async list(
    request: PaginatedRequest,
    filters?: EscalationListFilters,
  ): Promise<PaginatedResult<Escalation>> {
    await delay()
    return paginate(applyFilters(filters), request)
  },

  async getById(id: string): Promise<Escalation | null> {
    await delay()
    return memoryStore.escalations.find((item) => item.id === id) ?? null
  },

  async getStats(filters?: EscalationListFilters): Promise<HandoffStats> {
    await delay(80)
    const items = applyFilters(filters)
    const openItems = items.filter((item) => item.status !== EscalationStatus.Resolved)
    const resolvedToday = items.filter((item) => {
      if (!item.resolvedAt) return false
      const d = new Date(item.resolvedAt)
      const now = new Date()
      return d.toDateString() === now.toDateString()
    })
    const waits = openItems.map((item) =>
      Math.max(1, Math.round((Date.now() - new Date(item.openedAt).getTime()) / 60_000)),
    )
    const handling = resolvedToday.map((item) =>
      Math.round(
        (new Date(item.resolvedAt!).getTime() - new Date(item.openedAt).getTime()) / 60_000,
      ),
    )
    return {
      open: openItems.length,
      avgWaitMinutes: waits.length
        ? Math.round(waits.reduce((a, b) => a + b, 0) / waits.length)
        : 0,
      slaBreached: items.filter((item) => item.slaTone === 'critical').length,
      resolvedToday: resolvedToday.length,
      avgHandlingMinutes: handling.length
        ? Math.round(handling.reduce((a, b) => a + b, 0) / handling.length)
        : 0,
    }
  },

  async getTabCounts(
    filters?: Omit<EscalationListFilters, 'department'>,
  ): Promise<HandoffTabCounts> {
    await delay(60)
    const base = applyFilters({ ...filters, department: undefined })
    return {
      all: base.length,
      call_center: base.filter((i) => i.department === 'call_center').length,
      results: base.filter((i) => i.department === 'results').length,
      contracts: base.filter((i) => i.department === 'contracts').length,
    }
  },

  async assign(id: string, userId: string, assigneeName = 'Ahmed Supervisor'): Promise<Escalation> {
    await delay()
    const current = memoryStore.escalations.find((item) => item.id === id)
    if (!current) throw new Error('Escalation not found')
    const next = pushTimeline(
      {
        ...current,
        assignedUserId: userId,
        assigneeName,
        status: EscalationStatus.Assigned,
      },
      `Assigned to ${assigneeName}`,
    )
    upsertEscalation(next)
    return next
  },

  async reassign(id: string, userId: string, assigneeName: string): Promise<Escalation> {
    return escalationSource.assign(id, userId, assigneeName)
  },

  async changePriority(id: string, priority: EscalationPriority): Promise<Escalation> {
    await delay()
    const current = memoryStore.escalations.find((item) => item.id === id)
    if (!current) throw new Error('Escalation not found')
    const next = pushTimeline({ ...current, priority }, `Priority set to ${priority}`)
    upsertEscalation(next)
    return next
  },

  async resolve(id: string): Promise<Escalation> {
    await delay()
    const current = memoryStore.escalations.find((item) => item.id === id)
    if (!current) throw new Error('Escalation not found')
    const next = pushTimeline(
      {
        ...current,
        status: EscalationStatus.Resolved,
        resolvedAt: new Date().toISOString(),
        slaTone: 'ok',
      },
      'Resolved',
    )
    upsertEscalation(next)
    return next
  },

  async accept(id: string, userId: string, assigneeName = 'Ahmed Supervisor'): Promise<Escalation> {
    return escalationSource.assign(id, userId, assigneeName)
  },

  async returnToAi(id: string): Promise<Escalation> {
    await delay()
    const current = memoryStore.escalations.find((item) => item.id === id)
    if (!current) throw new Error('Escalation not found')
    const next = pushTimeline(
      {
        ...current,
        status: EscalationStatus.Resolved,
        resolvedAt: new Date().toISOString(),
        notes: `${current.notes ?? ''} Returned to AI.`.trim(),
      },
      'Returned to AI',
    )
    upsertEscalation(next)
    return next
  },

  async addNote(id: string, body: string, author = 'Ahmed Supervisor'): Promise<Escalation> {
    await delay()
    const current = memoryStore.escalations.find((item) => item.id === id)
    if (!current) throw new Error('Escalation not found')
    const next = {
      ...current,
      internalNotes: [
        ...(current.internalNotes ?? []),
        { id: `note-${Date.now()}`, at: new Date().toISOString(), author, body },
      ],
    }
    upsertEscalation(next)
    return next
  },
}
