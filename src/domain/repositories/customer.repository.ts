import type {
  Customer,
  CustomerListTab,
  CustomerNote,
  CustomerProfile,
  CustomerStats,
  CustomerStatus,
  CustomerTabCounts,
} from '@/domain/entities'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'

export interface CustomerListFilters {
  tab?: CustomerListTab
  channel?: string
  tag?: string
  serviceId?: string
  lastContactFrom?: string
  lastContactTo?: string
  hasInsurance?: boolean
  status?: CustomerStatus
  search?: string
}

export type CustomerInput = Omit<
  Customer,
  | 'id'
  | 'createdAt'
  | 'lastSeenAt'
  | 'totalBookings'
  | 'totalConversations'
  | 'notes'
  | 'attachments'
  | 'activity'
  | 'aiProfile'
  | 'lastServiceId'
  | 'satisfaction'
> & {
  id?: string
  satisfaction?: number
  lastServiceId?: Customer['lastServiceId']
  totalBookings?: number
  totalConversations?: number
  notes?: Customer['notes']
  attachments?: Customer['attachments']
  activity?: Customer['activity']
  aiProfile?: Customer['aiProfile']
  createdAt?: string
  lastSeenAt?: string
}

export interface ICustomerRepository {
  list(
    request: PaginatedRequest,
    filters?: CustomerListFilters,
  ): Promise<PaginatedResult<Customer>>
  getById(id: string): Promise<CustomerProfile | null>
  getStats(): Promise<CustomerStats>
  getTabCounts(filters?: Omit<CustomerListFilters, 'tab'>): Promise<CustomerTabCounts>
  create(input: CustomerInput): Promise<Customer>
  update(id: string, patch: Partial<Customer>): Promise<Customer>
  delete(id: string): Promise<void>
  block(id: string): Promise<Customer>
  unblock(id: string): Promise<Customer>
  addTags(ids: string[], tags: string[]): Promise<void>
  setTags(id: string, tags: string[]): Promise<Customer>
  addNote(customerId: string, body: string): Promise<CustomerNote>
  updateNote(customerId: string, noteId: string, body: string): Promise<CustomerNote>
  pinNote(customerId: string, noteId: string, pinned: boolean): Promise<CustomerNote>
  deleteNote(customerId: string, noteId: string): Promise<void>
}
