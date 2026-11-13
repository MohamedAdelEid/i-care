import type {
  Customer,
  CustomerListTab,
  CustomerNote,
  CustomerProfile,
  CustomerStats,
  CustomerTabCounts,
} from '@/domain/entities'
import type {
  CustomerInput,
  CustomerListFilters,
} from '@/domain/repositories/customer.repository'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'
import { memoryStore } from '@/infrastructure/data/memory-store'
import { delay, filterBySearch, paginate } from '@/infrastructure/data/utils/source.utils'

const upsertCustomer = (customer: Customer) => {
  const index = memoryStore.customers.findIndex((item) => item.id === customer.id)
  if (index >= 0) memoryStore.customers[index] = customer
  else memoryStore.customers.unshift(customer)
}

const isNewCustomer = (customer: Customer) =>
  customer.tags.includes('new') || customer.totalBookings + customer.totalConversations <= 1

const isReturning = (customer: Customer) =>
  !customer.tags.includes('new') && customer.totalBookings + customer.totalConversations >= 2

const isFlagged = (customer: Customer) =>
  Boolean(customer.flagged) || customer.status === 'blocked' || customer.tags.includes('flagged')

const matchesTab = (customer: Customer, tab?: CustomerListTab) => {
  if (!tab || tab === 'all') return true
  if (tab === 'new') return isNewCustomer(customer)
  if (tab === 'returning') return isReturning(customer) && !isNewCustomer(customer)
  if (tab === 'insurance') return customer.hasInsurance || customer.tags.includes('insurance')
  if (tab === 'flagged') return isFlagged(customer)
  return true
}

const applyFilters = (filters?: CustomerListFilters) => {
  let items = [...memoryStore.customers]
  if (filters?.tab) items = items.filter((item) => matchesTab(item, filters.tab))
  if (filters?.channel) {
    items = items.filter((item) =>
      item.channels.some((channel) => channel.channelType === filters.channel),
    )
  }
  if (filters?.tag) items = items.filter((item) => item.tags.includes(filters.tag!))
  if (filters?.serviceId) {
    items = items.filter((item) => item.lastServiceId === filters.serviceId)
  }
  if (typeof filters?.hasInsurance === 'boolean') {
    items = items.filter((item) => item.hasInsurance === filters.hasInsurance)
  }
  if (filters?.status) items = items.filter((item) => item.status === filters.status)
  if (filters?.lastContactFrom) {
    const from = filters.lastContactFrom
    items = items.filter((item) => item.lastSeenAt.slice(0, 10) >= from)
  }
  if (filters?.lastContactTo) {
    const to = filters.lastContactTo
    items = items.filter((item) => item.lastSeenAt.slice(0, 10) <= to)
  }
  items = filterBySearch(items, filters?.search, ['displayName', 'phone', 'email', 'id'])
  return items.sort((a, b) => b.lastSeenAt.localeCompare(a.lastSeenAt))
}

const refreshCounters = (customer: Customer): Customer => {
  const totalConversations = memoryStore.conversations.filter(
    (item) => item.customerId === customer.id,
  ).length
  const totalBookings = memoryStore.bookings.filter((item) => item.phone === customer.phone).length
  return { ...customer, totalConversations, totalBookings }
}

const defaultAiProfile = (language: Customer['preferredLanguage']): Customer['aiProfile'] => ({
  preferences: language === 'ar' ? 'لا تفضيلات بعد.' : 'No preferences captured yet.',
  language,
})

export const customerSource = {
  async list(
    request: PaginatedRequest,
    filters?: CustomerListFilters,
  ): Promise<PaginatedResult<Customer>> {
    await delay()
    return paginate(applyFilters(filters), request)
  },

  async getById(id: string): Promise<CustomerProfile | null> {
    await delay()
    const customer = memoryStore.customers.find((item) => item.id === id)
    if (!customer) return null
    const refreshed = refreshCounters(customer)
    const conversations = memoryStore.conversations
      .filter((item) => item.customerId === id)
      .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt))
      .map((item) => ({
        id: item.id,
        subject: item.subject ?? '—',
        channelType: item.channelType,
        status: item.status,
        lastMessageAt: item.lastMessageAt,
      }))
    const bookings = memoryStore.bookings
      .filter((item) => item.phone === refreshed.phone)
      .sort((a, b) => b.day.localeCompare(a.day))
      .map((item) => ({
        id: item.id,
        day: item.day,
        timeSlot: item.timeSlot,
        serviceId: item.serviceId,
        status: item.status,
        doctorName: item.doctorName,
      }))
    return { ...refreshed, conversations, bookings }
  },

  async getStats(): Promise<CustomerStats> {
    await delay(80)
    const items = memoryStore.customers
    // Seed epoch is late 2025 — treat Nov 2025 as "this month" and lastSeen in Nov as "this week".
    const monthStart = '2025-11-01'
    const weekIso = '2025-11-06T00:00:00.000Z'
    const withScores = items.filter((item) => item.satisfaction > 0)
    const avgCsat =
      withScores.length === 0
        ? 0
        : Math.round(
            (withScores.reduce((sum, item) => sum + item.satisfaction, 0) / withScores.length) * 10,
          ) / 10
    return {
      total: items.length,
      newThisMonth: items.filter((item) => item.createdAt.slice(0, 10) >= monthStart).length,
      activeThisWeek: items.filter(
        (item) => item.status === 'active' && item.lastSeenAt >= weekIso,
      ).length,
      withInsurance: items.filter((item) => item.hasInsurance).length,
      avgCsat,
    }
  },

  async getTabCounts(
    filters?: Omit<CustomerListFilters, 'tab'>,
  ): Promise<CustomerTabCounts> {
    await delay(60)
    const base = applyFilters({ ...filters, tab: 'all' })
    return {
      all: base.length,
      new: base.filter((item) => isNewCustomer(item)).length,
      returning: base.filter((item) => isReturning(item) && !isNewCustomer(item)).length,
      insurance: base.filter(
        (item) => item.hasInsurance || item.tags.includes('insurance'),
      ).length,
      flagged: base.filter((item) => isFlagged(item)).length,
    }
  },

  async create(input: CustomerInput): Promise<Customer> {
    await delay(120)
    const now = new Date().toISOString()
    const customer: Customer = {
      id: input.id ?? `cust-${Date.now()}`,
      displayName: input.displayName,
      phone: input.phone,
      email: input.email || undefined,
      preferredLanguage: input.preferredLanguage,
      tags: input.tags ?? [],
      createdAt: input.createdAt ?? now,
      lastSeenAt: input.lastSeenAt ?? now,
      channels: input.channels ?? [],
      status: input.status ?? 'active',
      satisfaction: input.satisfaction ?? 0,
      hasInsurance: input.hasInsurance ?? false,
      lastServiceId: input.lastServiceId,
      totalBookings: input.totalBookings ?? 0,
      totalConversations: input.totalConversations ?? 0,
      flagged: input.flagged ?? input.status === 'blocked',
      notes: input.notes ?? [],
      attachments: input.attachments ?? [],
      activity: input.activity ?? [
        {
          id: `cact-${Date.now()}`,
          type: 'status',
          title: 'Customer created',
          at: now,
        },
      ],
      aiProfile: input.aiProfile ?? defaultAiProfile(input.preferredLanguage),
    }
    upsertCustomer(customer)
    return customer
  },

  async update(id: string, patch: Partial<Customer>): Promise<Customer> {
    await delay(100)
    const existing = memoryStore.customers.find((item) => item.id === id)
    if (!existing) throw new Error('Customer not found')
    const next: Customer = {
      ...existing,
      ...patch,
      id,
      flagged:
        patch.flagged ??
        (patch.status === 'blocked' ||
          (patch.tags ?? existing.tags).includes('flagged') ||
          existing.flagged),
    }
    upsertCustomer(next)
    return next
  },

  async delete(id: string): Promise<void> {
    await delay(80)
    memoryStore.customers = memoryStore.customers.filter((item) => item.id !== id)
  },

  async block(id: string): Promise<Customer> {
    return this.update(id, { status: 'blocked', flagged: true })
  },

  async unblock(id: string): Promise<Customer> {
    return this.update(id, { status: 'active', flagged: false })
  },

  async addTags(ids: string[], tags: string[]): Promise<void> {
    await delay(100)
    for (const id of ids) {
      const existing = memoryStore.customers.find((item) => item.id === id)
      if (!existing) continue
      const merged = [...new Set([...existing.tags, ...tags])]
      upsertCustomer({
        ...existing,
        tags: merged,
        flagged: existing.flagged || merged.includes('flagged'),
      })
    }
  },

  async setTags(id: string, tags: string[]): Promise<Customer> {
    return this.update(id, { tags, flagged: tags.includes('flagged') })
  },

  async addNote(customerId: string, body: string): Promise<CustomerNote> {
    await delay(80)
    const existing = memoryStore.customers.find((item) => item.id === customerId)
    if (!existing) throw new Error('Customer not found')
    const now = new Date().toISOString()
    const note: CustomerNote = {
      id: `cnote-${Date.now()}`,
      body,
      pinned: false,
      createdAt: now,
      updatedAt: now,
    }
    upsertCustomer({
      ...existing,
      notes: [note, ...existing.notes],
      activity: [
        {
          id: `cact-${Date.now()}`,
          type: 'note',
          title: 'Internal note added',
          at: now,
        },
        ...existing.activity,
      ],
    })
    return note
  },

  async updateNote(
    customerId: string,
    noteId: string,
    body: string,
  ): Promise<CustomerNote> {
    await delay(80)
    const existing = memoryStore.customers.find((item) => item.id === customerId)
    if (!existing) throw new Error('Customer not found')
    const now = new Date().toISOString()
    let updated: CustomerNote | undefined
    const notes = existing.notes.map((note) => {
      if (note.id !== noteId) return note
      updated = { ...note, body, updatedAt: now }
      return updated
    })
    if (!updated) throw new Error('Note not found')
    upsertCustomer({ ...existing, notes })
    return updated
  },

  async pinNote(
    customerId: string,
    noteId: string,
    pinned: boolean,
  ): Promise<CustomerNote> {
    await delay(60)
    const existing = memoryStore.customers.find((item) => item.id === customerId)
    if (!existing) throw new Error('Customer not found')
    let updated: CustomerNote | undefined
    const notes = existing.notes.map((note) => {
      if (note.id !== noteId) return note
      updated = { ...note, pinned, updatedAt: new Date().toISOString() }
      return updated
    })
    if (!updated) throw new Error('Note not found')
    upsertCustomer({
      ...existing,
      notes: [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned)),
    })
    return updated
  },

  async deleteNote(customerId: string, noteId: string): Promise<void> {
    await delay(60)
    const existing = memoryStore.customers.find((item) => item.id === customerId)
    if (!existing) throw new Error('Customer not found')
    upsertCustomer({
      ...existing,
      notes: existing.notes.filter((note) => note.id !== noteId),
    })
  },
}
