import { BellOff } from 'lucide-react'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const NotificationsEmptyState = () => {
  const { t } = useTranslation('notifications')

  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <BellOff className="size-5" aria-hidden />
      </div>
      <p className="text-sm font-medium text-foreground">{t('emptyTitle')}</p>
      <p className="mt-1 max-w-[16rem] text-xs text-muted-foreground">{t('emptyDescription')}</p>
    </div>
  )
}
