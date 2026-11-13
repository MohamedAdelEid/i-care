import { useTranslation } from '@/presentation/hooks/use-translation'
import { ClinicScheduleEditor } from '@/presentation/pages/clinic/schedule/clinic-schedule-editor'

import { useSettingsShell } from '../settings-shell'

export const SettingsHoursPage = () => {
  const { t } = useTranslation('settings')
  const { setDirty, registerSave } = useSettingsShell()

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{t('hoursTitle')}</h2>
        <p className="text-sm text-muted-foreground">{t('hoursDescription')}</p>
      </div>
      <ClinicScheduleEditor
        embed
        onDirtyChange={setDirty}
        registerSave={registerSave}
      />
    </div>
  )
}
