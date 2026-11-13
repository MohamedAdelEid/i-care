import type { EscalationPriority } from '@/domain/enums'
import type {
  EscalationListFilters,
  IEscalationRepository,
} from '@/domain/repositories/escalation.repository'
import type { PaginatedRequest } from '@/domain/types'
import { escalationSource } from '@/infrastructure/data/sources/escalation.source'

export class EscalationRepository implements IEscalationRepository {
  list(request: PaginatedRequest, filters?: EscalationListFilters) {
    return escalationSource.list(request, filters)
  }

  getById(id: string) {
    return escalationSource.getById(id)
  }

  getStats(filters?: EscalationListFilters) {
    return escalationSource.getStats(filters)
  }

  getTabCounts(filters?: Omit<EscalationListFilters, 'department'>) {
    return escalationSource.getTabCounts(filters)
  }

  assign(id: string, userId: string, assigneeName?: string) {
    return escalationSource.assign(id, userId, assigneeName)
  }

  reassign(id: string, userId: string, assigneeName: string) {
    return escalationSource.reassign(id, userId, assigneeName)
  }

  changePriority(id: string, priority: EscalationPriority) {
    return escalationSource.changePriority(id, priority)
  }

  resolve(id: string) {
    return escalationSource.resolve(id)
  }

  accept(id: string, userId: string, assigneeName?: string) {
    return escalationSource.accept(id, userId, assigneeName)
  }

  returnToAi(id: string) {
    return escalationSource.returnToAi(id)
  }

  addNote(id: string, body: string, author?: string) {
    return escalationSource.addNote(id, body, author)
  }
}
