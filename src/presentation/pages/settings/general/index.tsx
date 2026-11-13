import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useGeneralSettings, useSettingsActions } from '@/application/hooks'
import { generalSettingsSchema, type GeneralSettingsSchema } from '@/domain/schemas'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { Field, FieldLabel } from '@/presentation/components/ui/field'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { useSettingsShell } from '../settings-shell'

export const SettingsGeneralPage = () => {
  const { t } = useTranslation('settings')
  const settings = useGeneralSettings()
  const { saveGeneral } = useSettingsActions()
  const { setDirty, registerSave } = useSettingsShell()

  const form = useForm<GeneralSettingsSchema>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: { orgName: '', defaultLanguage: 'en', timezone: '', logoUrl: '' },
  })

  useEffect(() => {
    if (settings.data) {
      form.reset({
        orgName: settings.data.orgName,
        defaultLanguage: settings.data.defaultLanguage === 'ar' ? 'ar' : 'en',
        timezone: settings.data.timezone,
        logoUrl: settings.data.logoUrl ?? '',
      })
    }
  }, [form, settings.data])

  useEffect(() => {
    setDirty(form.formState.isDirty)
  }, [form.formState.isDirty, setDirty])

  useEffect(() => {
    registerSave(async () => {
      const values = form.getValues()
      const parsed = generalSettingsSchema.parse(values)
      await saveGeneral(parsed)
      form.reset(parsed)
      settings.refetch()
    })
    return () => registerSave(null)
  }, [form, registerSave, saveGeneral, settings])

  return (
    <AsyncBoundary
      isLoading={settings.isLoading}
      error={settings.error}
      onRetry={settings.refetch}
    >
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{t('generalTitle')}</h2>
          <p className="text-sm text-muted-foreground">{t('generalDescription')}</p>
        </div>
        <form className="max-w-lg space-y-4 rounded-card border border-border bg-card p-5">
          <Field>
            <FieldLabel>{t('orgName')}</FieldLabel>
            <Input {...form.register('orgName')} />
            {form.formState.errors.orgName ? (
              <p className="text-xs text-destructive">{form.formState.errors.orgName.message}</p>
            ) : null}
          </Field>
          <Field>
            <FieldLabel>{t('logoUpload')}</FieldLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                form.setValue('logoUrl', file ? `/brand/${file.name}` : '', {
                  shouldDirty: true,
                })
              }}
            />
            <p className="text-xs text-muted-foreground">{t('logoHint')}</p>
          </Field>
          <Field>
            <FieldLabel>{t('defaultLanguage')}</FieldLabel>
            <select
              className="border-input bg-background h-9 w-full rounded-control border px-2"
              value={form.watch('defaultLanguage')}
              onChange={(e) =>
                form.setValue('defaultLanguage', e.target.value as 'en' | 'ar', {
                  shouldDirty: true,
                })
              }
            >
              <option value="en">{t('langEn')}</option>
              <option value="ar">{t('langAr')}</option>
            </select>
          </Field>
          <Field>
            <FieldLabel>{t('timezone')}</FieldLabel>
            <Input {...form.register('timezone')} />
          </Field>
        </form>
      </div>
    </AsyncBoundary>
  )
}
