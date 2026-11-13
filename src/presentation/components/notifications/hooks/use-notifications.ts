import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Notification } from '@/domain/entities'
import { useAuthStore, useNotificationsStore } from '@/presentation/store'
import { getNotificationMeta } from '../utils/notification-meta'

export const shouldConnectNotifications = () => useAuthStore.getState().isAuthenticated

export const disconnectNotificationsHub = () => undefined

export const useNotifications = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const items = useNotificationsStore((state) => state.items)
  const unreadCount = useNotificationsStore((state) => state.unreadCount)
  const pagination = useNotificationsStore((state) => state.pagination)
  const isLoading = useNotificationsStore((state) => state.isLoading)
  const isLoadingMore = useNotificationsStore((state) => state.isLoadingMore)
  const isMarkingAllRead = useNotificationsStore((state) => state.isMarkingAllRead)
  const isDropdownOpen = useNotificationsStore((state) => state.isDropdownOpen)
  const pulseToken = useNotificationsStore((state) => state.pulseToken)
  const setDropdownOpen = useNotificationsStore((state) => state.setDropdownOpen)
  const markItemRead = useNotificationsStore((state) => state.markItemRead)
  const markAllRead = useNotificationsStore((state) => state.markAllRead)
  const clearPulse = useNotificationsStore((state) => state.clearPulse)

  const onSelect = useCallback(
    (notification: Notification) => {
      markItemRead(notification.id)
      const meta = getNotificationMeta(notification.type)
      const route = meta.route(notification.data)
      if (route) navigate(route)
    },
    [markItemRead, navigate],
  )

  return {
    canUseNotifications: isAuthenticated,
    items,
    unreadCount,
    pagination,
    isLoading,
    isLoadingMore,
    isMarkingAllRead,
    connectionStatus: 'connected' as const,
    isDropdownOpen,
    pulseToken,
    setDropdownOpen,
    fetchInbox: async () => undefined,
    refreshInbox: async () => undefined,
    loadMore: async () => undefined,
    markAsRead: (id: string) => markItemRead(id),
    markAllAsRead: async () => markAllRead(),
    markAllRead: async () => markAllRead(),
    clearPulse,
    onSelect,
  }
}
