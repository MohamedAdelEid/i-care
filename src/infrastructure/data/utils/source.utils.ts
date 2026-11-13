import type { PaginatedRequest, PaginatedResult } from '@/domain/types'

const DEFAULT_DELAY_MS = 300

export const delay = (ms = DEFAULT_DELAY_MS) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })

export const paginate = <T>(items: T[], request: PaginatedRequest): PaginatedResult<T> => {
  const { page, pageSize } = request
  const start = (page - 1) * pageSize
  const slice = items.slice(start, start + pageSize)
  return {
    items: slice,
    total: items.length,
    page,
    pageSize,
  }
}

export const filterBySearch = <T extends object>(
  items: T[],
  search: string | undefined,
  keys: (keyof T)[],
) => {
  const q = search?.trim().toLowerCase()
  if (!q) return items
  return items.filter((item) =>
    keys.some((key) => String(item[key] ?? '').toLowerCase().includes(q)),
  )
}
