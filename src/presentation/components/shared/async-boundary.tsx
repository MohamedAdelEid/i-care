import type { ReactNode } from 'react'
import { Button } from '@/presentation/components/ui/button'
import { Skeleton } from '@/presentation/components/ui/skeleton'
import { useTranslation } from '@/presentation/hooks/use-translation'

interface AsyncBoundaryProps {
  isLoading: boolean
  error: Error | null
  onRetry?: () => void
  isEmpty?: boolean
  children: ReactNode
}

export const AsyncBoundary = ({
  isLoading,
  error,
  onRetry,
  isEmpty,
  children,
}: AsyncBoundaryProps) => {
  const { t } = useTranslation('common')

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="font-medium">{t('errorTitle')}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t('errorDescription')}</p>
        {onRetry ? (
          <Button type="button" className="mt-4" onClick={onRetry}>
            {t('retry')}
          </Button>
        ) : null}
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="font-medium">{t('emptyTitle')}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t('emptyDescription')}</p>
      </div>
    )
  }

  return children
}
