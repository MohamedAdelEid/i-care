import { useCallback, useState } from 'react'
import type { LoginInput } from '@/domain/repositories/auth.repository'
import { repositories } from '@/composition/repositories'
import { useAuthStore } from '@/presentation/store'

export const useAuthActions = () => {
  const setSession = useAuthStore((state) => state.setSession)
  const clearSession = useAuthStore((state) => state.clearSession)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const login = useCallback(
    async (input: LoginInput) => {
      setIsSubmitting(true)
      try {
        const session = await repositories.auth.login(input)
        setSession(session)
        return session
      } finally {
        setIsSubmitting(false)
      }
    },
    [setSession],
  )

  const logout = useCallback(async () => {
    await repositories.auth.logout()
    clearSession()
  }, [clearSession])

  return { login, logout, isSubmitting }
}
