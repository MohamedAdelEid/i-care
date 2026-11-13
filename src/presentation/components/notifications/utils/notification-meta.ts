import type { LucideIcon } from 'lucide-react'
import { Bell, MessageSquare, TriangleAlert, Unplug, UserCheck } from 'lucide-react'
import type { NotificationData } from '@/domain/entities'
import type { PaginationMeta } from '@/domain/types'
import { NotificationType } from '@/domain/enums'
import { ROUTES } from '@/presentation/routes/routes.constants'

export interface NotificationMeta {
  icon: LucideIcon
  labelKey: string
  accentClass: string
  route: (data: NotificationData) => string | null
}

export const formatUnreadBadge = (count: number) => (count > 99 ? '99+' : String(count))

export const hasMoreNotifications = (pagination: PaginationMeta | null) =>
  Boolean(pagination && pagination.page < pagination.totalPages)

export const getNotificationMeta = (type: NotificationType): NotificationMeta =>
  NOTIFICATION_META[type]

export const NOTIFICATION_META: Record<NotificationType, NotificationMeta> = {
  [NotificationType.EscalationOpened]: {
    icon: TriangleAlert,
    labelKey: 'types.escalation_opened',
    accentClass: 'text-destructive',
    route: (data) =>
      data.escalationId ? ROUTES.ESCALATIONS.detail(data.escalationId) : ROUTES.ESCALATIONS.OPEN,
  },
  [NotificationType.ConversationAssigned]: {
    icon: UserCheck,
    labelKey: 'types.conversation_assigned',
    accentClass: 'text-primary',
    route: (data) =>
      data.conversationId ? ROUTES.INBOX.thread(data.conversationId) : ROUTES.INBOX.ALL,
  },
  [NotificationType.AiHandoff]: {
    icon: MessageSquare,
    labelKey: 'types.ai_handoff',
    accentClass: 'text-primary',
    route: (data) =>
      data.conversationId ? ROUTES.INBOX.thread(data.conversationId) : ROUTES.INBOX.WAITING,
  },
  [NotificationType.ChannelDisconnected]: {
    icon: Unplug,
    labelKey: 'types.channel_disconnected',
    accentClass: 'text-muted-foreground',
    route: () => ROUTES.CHANNELS.TELEGRAM,
  },
  [NotificationType.CustomerMessage]: {
    icon: Bell,
    labelKey: 'types.customer_message',
    accentClass: 'text-primary',
    route: (data) =>
      data.conversationId ? ROUTES.INBOX.thread(data.conversationId) : ROUTES.INBOX.ALL,
  },
}
