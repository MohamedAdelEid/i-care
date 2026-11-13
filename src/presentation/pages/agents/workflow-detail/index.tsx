import { Navigate, useParams } from 'react-router-dom'

import { DEFAULT_AGENT_ID } from '@/domain/entities'
import { ROUTES } from '@/presentation/routes/routes.constants'

export const WorkflowDetailPage = () => {
  const { workflowId } = useParams()
  return (
    <Navigate
      to={ROUTES.AGENTS.detailTab(DEFAULT_AGENT_ID, 'workflows', workflowId)}
      replace
    />
  )
}
