import { useEffect, type ReactNode } from 'react'
import { NotificationType } from '@/domain/enums'
import type { Notification } from '@/domain/entities'
import { useNotificationsStore } from '@/presentation/store'

const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: NotificationType.EscalationOpened,
    title: 'New escalation',
    body: 'Patient requested human agent',
    createdAt: new Date().toISOString(),
    isRead: false,
    data: { escalationId: 'esc-001' },
  },
  {
    id: 'n2',
    type: NotificationType.CustomerMessage,
    title: 'New customer message',
    body: 'Can I book an eye exam this week?',
    createdAt: new Date().toISOString(),
    isRead: false,
    data: { conversationId: 'conv-001' },
  },
  {
    id: 'n3',
    type: NotificationType.AiHandoff,
    title: 'AI handoff',
    body: 'Complex insurance question',
    createdAt: new Date().toISOString(),
    isRead: true,
    data: { conversationId: 'conv-002' },
  },
]

interface NotificationsProviderProps {
  children: ReactNode
}

export const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
  useEffect(() => {
    useNotificationsStore.getState().seed(SEED_NOTIFICATIONS)
  }, [])

  return children
}
