import { Navigate } from 'react-router-dom'

import { DEFAULT_AGENT_ID } from '@/domain/entities'
import { ROUTES } from '@/presentation/routes/routes.constants'

export const PlaygroundPage = () => (
  <Navigate to={ROUTES.AGENTS.detailTab(DEFAULT_AGENT_ID, 'playground')} replace />
)
