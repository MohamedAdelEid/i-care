import { useEffect } from 'react'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const DocumentHead = () => {
  const { t } = useTranslation('common')
  useEffect(() => {
    document.title = t('appName')
  }, [t])
  return null
}
