import { formatDistanceToNow } from 'date-fns'
import { arSA, enUS } from 'date-fns/locale'
import { motion } from 'framer-motion'
import type { Notification } from '@/domain/entities'
import { Language } from '@/domain/enums'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { useLanguageStore } from '@/presentation/store'
import { cn } from '@/presentation/utils'
import { getNotificationMeta } from './utils/notification-meta'

interface NotificationItemProps {
  notification: Notification
  index: number
  onSelect: (notification: Notification) => void
}

export const NotificationItem = ({ notification, index, onSelect }: NotificationItemProps) => {
  const { t } = useTranslation('notifications')
  const language = useLanguageStore((state) => state.language)
  const locale = language === Language.Arabic ? arSA : enUS
  const meta = getNotificationMeta(notification.type)
  const Icon = meta.icon

  const relativeTime = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
    locale,
  })

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index === 0 ? 0 : Math.min(index * 0.03, 0.12) }}
      className="list-none"
    >
      <button
        type="button"
        onClick={() => onSelect(notification)}
        className={cn(
          'group relative flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-start transition-colors',
          'hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          !notification.isRead && 'bg-muted/25',
        )}
      >
        {!notification.isRead && (
          <span
            aria-hidden
            className="absolute inset-y-2 start-0 w-0.5 rounded-full bg-primary"
          />
        )}

        <div
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-lg border',
            meta.accentClass,
          )}
        >
          <Icon className="size-3.5" strokeWidth={2} aria-hidden />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <span
              className={cn(
                'text-xs font-semibold tracking-wide uppercase',
                notification.isRead ? 'text-muted-foreground' : 'text-foreground',
              )}
            >
              {t(meta.labelKey)}
            </span>
            <time
              dateTime={notification.createdAt}
              className="shrink-0 text-[10px] text-muted-foreground/80"
            >
              {relativeTime}
            </time>
          </div>

          <p
            className={cn(
              'mt-1 line-clamp-1 text-sm font-medium',
              notification.isRead ? 'text-muted-foreground' : 'text-foreground',
            )}
          >
            {notification.title}
          </p>

          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {notification.body}
          </p>
        </div>

        {!notification.isRead && (
          <span
            aria-label={t('unread')}
            className="mt-2 size-2 shrink-0 rounded-full bg-primary"
          />
        )}
      </button>
    </motion.li>
  )
}
