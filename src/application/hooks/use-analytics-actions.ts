import { useCallback } from 'react'

import { repositories } from '@/composition/repositories'

export const useAnalyticsActions = () => {
  const dismissUnanswered = useCallback(
    (ids: string[]) => repositories.analytics.dismissUnanswered(ids),
    [],
  )
  const addUnansweredToKnowledge = useCallback(
    (ids: string[]) => repositories.analytics.addUnansweredToKnowledge(ids),
    [],
  )

  return { dismissUnanswered, addUnansweredToKnowledge }
}
