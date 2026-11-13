import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/presentation/components/ui/popover'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { useNotificationsStore } from '@/presentation/store'
import { unlockNotificationSound } from '@/infrastructure/libs/audio/notification-sound'
import { cn } from '@/presentation/utils'
import { useNotifications } from './hooks/use-notifications'
import { NotificationDropdown } from './notification-dropdown'
import { formatUnreadBadge } from './utils/notification-meta'

export const NotificationBell = () => {
  const { t } = useTranslation('notifications')
  const [open, setOpen] = useState(false)
  const storeDropdownOpen = useNotificationsStore((state) => state.isDropdownOpen)
  const {
    canUseNotifications,
    unreadCount,
    pulseToken,
    refreshInbox,
    clearPulse,
  } = useNotifications()

  useEffect(() => {
    if (!storeDropdownOpen && open) {
      setOpen(false)
    }
  }, [storeDropdownOpen, open])

  useEffect(() => {
    if (!pulseToken) return

    const timer = window.setTimeout(() => clearPulse(), 1200)
    return () => window.clearTimeout(timer)
  }, [pulseToken, clearPulse])

  if (!canUseNotifications) return null

  const badge = formatUnreadBadge(unreadCount)

  const handleOpenChange = (next: boolean) => {
    if (next) {
      unlockNotificationSound()
    }

    setOpen(next)
    useNotificationsStore.getState().setDropdownOpen(next)
    if (next) {
      void refreshInbox()
    }
  }

  const handleClose = () => {
    setOpen(false)
    useNotificationsStore.getState().setDropdownOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={t('bellAria', { count: unreadCount })}
          aria-expanded={open}
          className={cn(
            'relative flex size-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
            pulseToken && 'motion-safe:animate-[bell-pulse_0.6s_ease-out]',
          )}
        >
          <Bell className="size-4" aria-hidden />
          {badge && (
            <span
              className={cn(
                'size-5 absolute -end-2 -top-2 flex min-w-[1.125rem] items-center justify-center rounded-full',
                'bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground',
              )}
            >
              {badge}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        collisionPadding={16}
        className="z-[100] w-auto p-0"
      >
        <NotificationDropdown onClose={handleClose} />
      </PopoverContent>
    </Popover>
  )
}
