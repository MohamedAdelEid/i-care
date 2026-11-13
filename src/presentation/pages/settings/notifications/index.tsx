import { useEffect, useMemo, useState } from 'react'

import { useNotificationPreferences, useSettingsActions } from '@/application/hooks'
import type { NotificationPreference } from '@/domain/entities/settings.entity'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { Checkbox } from '@/presentation/components/ui/checkbox'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { useSettingsShell } from '../settings-shell'

export const SettingsNotificationsPage = () => {
  const { t } = useTranslation('settings')
  const prefs = useNotificationPreferences()
  const { saveNotificationPrefs } = useSettingsActions()
  const { setDirty, registerSave } = useSettingsShell()
  const [draft, setDraft] = useState<NotificationPreference[]>([])
  const [baseline, setBaseline] = useState('')

  useEffect(() => {
    if (!prefs.data) return
    const next = structuredClone(prefs.data)
    setDraft(next)
    setBaseline(JSON.stringify(next))
  }, [prefs.data])

  useEffect(() => {
    setDirty(JSON.stringify(draft) !== baseline && baseline !== '')
  }, [baseline, draft, setDirty])

  useEffect(() => {
    registerSave(async () => {
      await saveNotificationPrefs(draft)
      setBaseline(JSON.stringify(draft))
      prefs.refetch()
    })
    return () => registerSave(null)
  }, [draft, prefs, registerSave, saveNotificationPrefs])

  const groups = useMemo(() => {
    const map = new Map<string, NotificationPreference[]>()
    for (const pref of draft) {
      const list = map.get(pref.group) ?? []
      list.push(pref)
      map.set(pref.group, list)
    }
    return [...map.entries()]
  }, [draft])

  const patch = (eventType: string, key: 'inApp' | 'email', value: boolean) => {
    setDraft((prev) =>
      prev.map((item) => (item.eventType === eventType ? { ...item, [key]: value } : item)),
    )
  }

  return (
    <AsyncBoundary isLoading={prefs.isLoading} error={prefs.error} onRetry={prefs.refetch}>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{t('notificationsTitle')}</h2>
          <p className="text-sm text-muted-foreground">{t('notificationsDescription')}</p>
        </div>

        <div className="space-y-4">
          {groups.map(([group, items]) => (
            <section
              key={group}
              className="space-y-3 rounded-card border border-border bg-card p-4"
            >
              <h3 className="text-sm font-semibold">{group}</h3>
              {items.map((pref) => (
                <div
                  key={pref.eventType}
                  className="flex flex-wrap items-center justify-between gap-3 text-sm"
                >
                  <span>{pref.eventType}</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={pref.inApp}
                        onCheckedChange={(value) =>
                          patch(pref.eventType, 'inApp', value === true)
                        }
                      />
                      {t('prefInApp')}
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={pref.email}
                        onCheckedChange={(value) =>
                          patch(pref.eventType, 'email', value === true)
                        }
                      />
                      {t('prefEmail')}
                    </label>
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </AsyncBoundary>
  )
}
