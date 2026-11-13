import { useCallback, useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { cn } from '@/presentation/utils'
import { NotificationsEmptyState } from './empty-state'
import { useNotifications } from './hooks/use-notifications'
import { NotificationItem } from './notification-item'
import { NotificationSkeletonList } from './notification-skeleton'
import { hasMoreNotifications } from './utils/notification-meta'

interface NotificationDropdownProps {
  onClose: () => void
}

export const NotificationDropdown = ({ onClose }: NotificationDropdownProps) => {
  const { t } = useTranslation('notifications')
  const {
    items,
    isLoading,
    isLoadingMore,
    isMarkingAllRead,
    unreadCount,
    pagination,
    loadMore,
    markAsRead,
    markAllAsRead,
  } = useNotifications()

  const listRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const canLoadMore = hasMoreNotifications(pagination)

  const handleScroll = useCallback(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !canLoadMore || isLoadingMore || isLoading) return

    const rect = sentinel.getBoundingClientRect()
    if (rect.top <= window.innerHeight) {
      void loadMore()
    }
  }, [canLoadMore, isLoadingMore, isLoading, loadMore])

  useEffect(() => {
    const container = listRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll, items.length])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="flex w-[min(24rem,calc(100vw-2rem))] flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{t('title')}</h2>
          {unreadCount > 0 && (
            <p className="text-xs text-muted-foreground">
              {t('unreadCount', { count: unreadCount })}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => void markAllAsRead()}
          disabled={unreadCount === 0 || isMarkingAllRead}
          className={cn(
            'rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors',
            'hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
        >
          {isMarkingAllRead ? (
            <span className="inline-flex items-center gap-1.5">
              <Loader2 className="size-3 animate-spin" aria-hidden />
              {t('markingAll')}
            </span>
          ) : (
            t('markAllRead')
          )}
        </button>
      </div>

      <div
        ref={listRef}
        className="max-h-[min(24rem,60vh)] overflow-y-auto overscroll-contain px-2 py-2"
        role="list"
        aria-label={t('title')}
        aria-busy={isLoading}
      >
        {isLoading && items.length === 0 ? (
          <NotificationSkeletonList />
        ) : items.length === 0 ? (
          <NotificationsEmptyState />
        ) : (
          <ul className="space-y-1">
            {items.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                index={index}
                onSelect={(item) => markAsRead(item.id)}
              />
            ))}
          </ul>
        )}

        {canLoadMore && (
          <div ref={sentinelRef} className="flex justify-center py-3">
            {isLoadingMore && (
              <Loader2 className="size-4 animate-spin text-muted-foreground" aria-label={t('loadingMore')} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
