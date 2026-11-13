import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { SPRING_OVERLAY } from '@/presentation/utils/motion'

import type { KitBulkAction } from './types'

export interface KitDataTableBulkBarProps<T> {
  count: number
  actions: KitBulkAction<T>[]
  rows: T[]
  ids: string[]
  onClear: () => void
}

export const KitDataTableBulkBar = <T,>({
  count,
  actions,
  rows,
  ids,
  onClear,
}: KitDataTableBulkBarProps<T>) => {
  const { t } = useTranslation('kit')

  return (
    <AnimatePresence>
      {count > 0 ? (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={SPRING_OVERLAY}
        >
          <div className="pointer-events-auto flex flex-wrap items-center gap-2 rounded-full border border-border/50 bg-foreground px-4 py-2 text-background shadow-elevation-md">
            <span className="text-sm font-medium tabular-nums">{t('selected', { count })}</span>
            {actions.map((action) => {
              const Icon = action.icon
              return (
                <Button
                  key={action.id}
                  type="button"
                  size="sm"
                  variant={action.variant === 'destructive' ? 'destructive' : 'secondary'}
                  className="h-8"
                  onClick={() => void action.onAction(rows, ids)}
                >
                  {Icon ? <Icon className="size-4" /> : null}
                  {action.label}
                </Button>
              )
            })}
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              className="text-background hover:bg-background/10"
              onClick={onClear}
              aria-label={t('clearSelection')}
            >
              <X className="size-4" />
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
