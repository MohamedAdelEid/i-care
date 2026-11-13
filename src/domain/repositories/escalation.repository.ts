import type { Escalation, HandoffStats, HandoffTabCounts } from '@/domain/entities'
import type { EscalationPriority } from '@/domain/enums'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'

export interface EscalationListFilters {
  status?: string
  assignee?: 'me' | 'all'
  search?: string
  department?: string
  serviceId?: string
  priority?: string
  assigneeId?: string
  slaState?: 'ok' | 'warning' | 'critical' | 'breached'
  from?: string
  to?: string
}

export interface IEscalationRepository {
  list(
    request: PaginatedRequest,
    filters?: EscalationListFilters,
  ): Promise<PaginatedResult<Escalation>>
  getById(id: string): Promise<Escalation | null>
  getStats(filters?: EscalationListFilters): Promise<HandoffStats>
  getTabCounts(filters?: Omit<EscalationListFilters, 'department'>): Promise<HandoffTabCounts>
  assign(id: string, userId: string, assigneeName?: string): Promise<Escalation>
  reassign(id: string, userId: string, assigneeName: string): Promise<Escalation>
  changePriority(id: string, priority: EscalationPriority): Promise<Escalation>
  resolve(id: string): Promise<Escalation>
  accept(id: string, userId: string, assigneeName?: string): Promise<Escalation>
  returnToAi(id: string): Promise<Escalation>
  addNote(id: string, body: string, author?: string): Promise<Escalation>
}
