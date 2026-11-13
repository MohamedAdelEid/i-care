import { KitPageHeader } from '@/presentation/components/kit'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { ClinicScheduleEditor } from './clinic-schedule-editor'

export const ClinicSchedulePage = () => {
  const { t } = useTranslation('clinic')

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader title={t('scheduleTitle')} description={t('scheduleDescription')} />
      <ClinicScheduleEditor />
    </div>
  )
}
