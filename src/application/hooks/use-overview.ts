import { useEffect, useRef, useState } from 'react'

import { useAsync } from '@/application/hooks/use-async'
import { repositories } from '@/composition/repositories'
import type { LiveConversationItem, OverviewDateRange } from '@/domain/entities'

export const useOverviewDashboard = (range: OverviewDateRange) =>
  useAsync(() => repositories.analytics.getOverviewDashboard(range), [range])

export const useLiveConversations = (options?: { intervalMs?: number }) => {
  const intervalMs = options?.intervalMs ?? 8000
  const [data, setData] = useState<LiveConversationItem[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [tick, setTick] = useState(0)
  const mounted = useRef(true)

  const refetch = () => setTick((value) => value + 1)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    let active = true
    if (tick === 0) setIsLoading(true)
    void repositories.analytics
      .getLiveFeed()
      .then((result) => {
        if (active && mounted.current) setData(result)
      })
      .catch((err: unknown) => {
        if (active && mounted.current) {
          setError(err instanceof Error ? err : new Error('Live feed failed'))
        }
      })
      .finally(() => {
        if (active && mounted.current) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [tick])

  useEffect(() => {
    const id = window.setInterval(() => setTick((value) => value + 1), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])

  return { data, error, isLoading, refetch }
}
