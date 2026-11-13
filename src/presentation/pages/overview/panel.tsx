import { Info } from 'lucide-react'
import type { ReactNode } from 'react'

import { Skeleton } from '@/presentation/components/ui/skeleton'
import { Button } from '@/presentation/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/presentation/components/ui/tooltip'
import { cn } from '@/presentation/utils'
import { useTranslation } from '@/presentation/hooks/use-translation'

export interface OverviewPanelProps {
  title: string
  tip: string
  children: ReactNode
  className?: string
  action?: ReactNode
  isLoading?: boolean
  error?: Error | null
  onRetry?: () => void
  isEmpty?: boolean
  emptyMessage?: string
}

export const OverviewPanel = ({
  title,
  tip,
  children,
  className,
  action,
  isLoading,
  error,
  onRetry,
  isEmpty,
  emptyMessage,
}: OverviewPanelProps) => {
  const { t } = useTranslation('common')

  return (
    <section
      className={cn(
        'rounded-card border border-border bg-card p-4 shadow-elevation-sm',
        className,
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground inline-flex size-5 items-center justify-center rounded-full"
                  aria-label={tip}
                >
                  <Info className="size-3.5" aria-hidden />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs text-xs">
                {tip}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {action}
      </div>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : error ? (
        <div className="rounded-control border border-dashed p-6 text-center">
          <p className="text-sm font-medium">{t('errorTitle')}</p>
          <p className="text-muted-foreground mt-1 text-xs">{t('errorDescription')}</p>
          {onRetry ? (
            <Button type="button" size="sm" className="mt-3" onClick={onRetry}>
              {t('retry')}
            </Button>
          ) : null}
        </div>
      ) : isEmpty ? (
        <p className="text-muted-foreground py-8 text-center text-sm">{emptyMessage}</p>
      ) : (
        children
      )}
    </section>
  )
}
