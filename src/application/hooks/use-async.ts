import { useCallback, useEffect, useState } from 'react'

interface AsyncState<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  refetch: () => void
}

export const useAsync = <T>(factory: () => Promise<T>, deps: unknown[]): AsyncState<T> => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => setTick((value) => value + 1), [])

  const depsKey = JSON.stringify(deps)

  useEffect(() => {
    let active = true
    setIsLoading(true)
    setError(null)
    void factory()
      .then((result) => {
        if (active) setData(result)
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err : new Error('Request failed'))
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [tick, depsKey])

  return { data, error, isLoading, refetch }
}
