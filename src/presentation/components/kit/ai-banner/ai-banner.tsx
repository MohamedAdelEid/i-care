import { Sparkles, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { Button } from '@/presentation/components/ui/button'
import { cn } from '@/presentation/utils'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { microTransition } from '@/presentation/utils/motion'

export interface KitAiBannerProps {
  count: number
  message?: string
  dismissible?: boolean
  onDismiss?: () => void
  onViewLog?: () => void
  actionLabel?: string
  className?: string
}

export const KitAiBanner = ({
  count,
  message,
  dismissible = true,
  onDismiss,
  onViewLog,
  actionLabel,
  className,
}: KitAiBannerProps) => {
  const { t } = useTranslation('kit')
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  const handleDismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-card border border-ai/25 bg-ai-soft p-4 shadow-elevation-sm sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
      role="status"
    >
      <div className="flex min-w-0 items-start gap-3">
        <span className="relative mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-ai/15 text-ai">
          <Sparkles className="size-4" aria-hidden />
          <motion.span
            className="absolute inset-0 rounded-full border border-ai/40"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ ...microTransition, repeat: Infinity, duration: 2 }}
            aria-hidden
          />
        </span>
        <p className="text-sm text-foreground">
          {message ?? t('aiBannerMessage', { count })}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {onViewLog ? (
          <Button type="button" variant="outline" size="sm" onClick={onViewLog} className="border-ai/30">
            {actionLabel ?? t('viewLog')}
          </Button>
        ) : null}
        {dismissible ? (
          <Button type="button" variant="ghost" size="sm" onClick={handleDismiss}>
            <X className="size-4" aria-hidden />
            <span>{t('dismiss')}</span>
          </Button>
        ) : null}
      </div>
    </div>
  )
}
