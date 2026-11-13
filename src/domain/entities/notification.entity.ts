import type { NotificationType } from '@/domain/enums'

export interface NotificationData {
  conversationId?: string
  escalationId?: string
  customerId?: string
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  body: string
  createdAt: string
  isRead: boolean
  readAt?: string
  data: NotificationData
}
