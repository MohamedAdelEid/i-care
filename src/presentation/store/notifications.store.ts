import { create } from 'zustand'
import type { Notification } from '@/domain/entities'
import type { PaginationMeta } from '@/domain/types'

type ConnectionStatus = 'connected' | 'disconnected'

interface NotificationsState {
  items: Notification[]
  unreadCount: number
  pagination: PaginationMeta | null
  isLoading: boolean
  isLoadingMore: boolean
  isMarkingAllRead: boolean
  connectionStatus: ConnectionStatus
  isDropdownOpen: boolean
  pulseToken: number | null
  setDropdownOpen: (open: boolean) => void
  setLoading: (loading: boolean) => void
  setMarkingAllRead: (marking: boolean) => void
  setInboxPage: (items: Notification[], pagination: PaginationMeta | null, unreadCount: number) => void
  markItemRead: (id: string) => void
  markAllRead: () => void
  seed: (items: Notification[]) => void
  clearPulse: () => void
}

export const useNotificationsStore = create<NotificationsState>()((set) => ({
  items: [],
  unreadCount: 0,
  pagination: null,
  isLoading: false,
  isLoadingMore: false,
  isMarkingAllRead: false,
  connectionStatus: 'connected',
  isDropdownOpen: false,
  pulseToken: null,

  setDropdownOpen: (open) => set({ isDropdownOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
  setMarkingAllRead: (marking) => set({ isMarkingAllRead: marking }),

  setInboxPage: (items, pagination, unreadCount) => set({ items, pagination, unreadCount }),

  markItemRead: (id) =>
    set((state) => {
      const target = state.items.find((item) => item.id === id)
      if (!target || target.isRead) return state
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, isRead: true, readAt: new Date().toISOString() } : item,
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }
    }),

  markAllRead: () =>
    set((state) => ({
      items: state.items.map((item) =>
        item.isRead ? item : { ...item, isRead: true, readAt: new Date().toISOString() },
      ),
      unreadCount: 0,
    })),

  seed: (items) =>
    set({
      items,
      unreadCount: items.filter((item) => !item.isRead).length,
      pagination: {
        page: 1,
        pageSize: items.length,
        total: items.length,
        totalPages: 1,
      },
    }),

  clearPulse: () => set({ pulseToken: null }),
}))
