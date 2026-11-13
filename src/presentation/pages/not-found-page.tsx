import { Link } from 'react-router-dom'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'

export const NotFoundPage = () => {
  const { t } = useTranslation('common')
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">{t('notFoundTitle')}</h1>
      <p className="text-muted-foreground">{t('notFoundMessage')}</p>
      <Button asChild>
        <Link to={ROUTES.OVERVIEW}>{t('backHome')}</Link>
      </Button>
    </div>
  )
}
