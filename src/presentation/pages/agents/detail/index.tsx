import { useParams } from 'react-router-dom'

import { AgentDetailShell } from './agent-detail-shell'

export const AgentDetailPage = () => {
  const { agentId } = useParams()
  if (!agentId) return null
  return <AgentDetailShell agentId={agentId} />
}
