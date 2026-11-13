export interface PaginatedRequest {
  page: number
  pageSize: number
  sort?: { id: string; desc: boolean }
  filters?: Record<string, string | undefined>
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
