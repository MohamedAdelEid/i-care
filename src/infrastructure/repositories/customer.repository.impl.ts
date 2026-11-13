import type { Customer } from '@/domain/entities'
import type {
  CustomerInput,
  CustomerListFilters,
  ICustomerRepository,
} from '@/domain/repositories/customer.repository'
import type { PaginatedRequest } from '@/domain/types'
import { customerSource } from '@/infrastructure/data/sources/customer.source'

export class CustomerRepository implements ICustomerRepository {
  list(request: PaginatedRequest, filters?: CustomerListFilters) {
    return customerSource.list(request, filters)
  }

  getById(id: string) {
    return customerSource.getById(id)
  }

  getStats() {
    return customerSource.getStats()
  }

  getTabCounts(filters?: Omit<CustomerListFilters, 'tab'>) {
    return customerSource.getTabCounts(filters)
  }

  create(input: CustomerInput) {
    return customerSource.create(input)
  }

  update(id: string, patch: Partial<Customer>) {
    return customerSource.update(id, patch)
  }

  delete(id: string) {
    return customerSource.delete(id)
  }

  block(id: string) {
    return customerSource.block(id)
  }

  unblock(id: string) {
    return customerSource.unblock(id)
  }

  addTags(ids: string[], tags: string[]) {
    return customerSource.addTags(ids, tags)
  }

  setTags(id: string, tags: string[]) {
    return customerSource.setTags(id, tags)
  }

  addNote(customerId: string, body: string) {
    return customerSource.addNote(customerId, body)
  }

  updateNote(customerId: string, noteId: string, body: string) {
    return customerSource.updateNote(customerId, noteId, body)
  }

  pinNote(customerId: string, noteId: string, pinned: boolean) {
    return customerSource.pinNote(customerId, noteId, pinned)
  }

  deleteNote(customerId: string, noteId: string) {
    return customerSource.deleteNote(customerId, noteId)
  }
}
