import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { PaginationState, SortingState } from '@tanstack/react-table'

const DEFAULT_PREFIX = 'kit'

export const useKitTableUrlState = (prefix = DEFAULT_PREFIX) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const key = useCallback((name: string) => `${prefix}_${name}`, [prefix])

  const search = searchParams.get(key('q')) ?? ''
  const tab = searchParams.get(key('tab')) ?? ''
  const pageIndex = Number(searchParams.get(key('page')) ?? '0') || 0
  const pageSize = Number(searchParams.get(key('size')) ?? '10') || 10
  const sortId = searchParams.get(key('sort')) ?? ''
  const sortDesc = searchParams.get(key('dir')) === 'desc'

  const pagination: PaginationState = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize],
  )

  const sorting: SortingState = useMemo(
    () => (sortId ? [{ id: sortId, desc: sortDesc }] : []),
    [sortId, sortDesc],
  )

  const patch = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams)
      Object.entries(updates).forEach(([param, value]) => {
        if (value == null || value === '') next.delete(param)
        else next.set(param, value)
      })
      setSearchParams(next, { replace: true })
    },
    [searchParams, setSearchParams],
  )

  const setSearch = useCallback(
    (value: string) => patch({ [key('q')]: value || null }),
    [key, patch],
  )

  const setTab = useCallback((value: string) => patch({ [key('tab')]: value || null }), [key, patch])

  const setPagination = useCallback(
    (state: PaginationState) => {
      patch({
        [key('page')]: String(state.pageIndex),
        [key('size')]: String(state.pageSize),
      })
    },
    [key, patch],
  )

  const setSorting = useCallback(
    (state: SortingState) => {
      const first = state[0]
      patch({
        [key('sort')]: first?.id ?? null,
        [key('dir')]: first ? (first.desc ? 'desc' : 'asc') : null,
      })
    },
    [key, patch],
  )

  return {
    search,
    tab,
    pagination,
    sorting,
    setSearch,
    setTab,
    setPagination,
    setSorting,
  }
}

export const useDebouncedValue = <T>(value: T, delayMs = 300): T => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(id)
  }, [value, delayMs])

  return debounced
}
