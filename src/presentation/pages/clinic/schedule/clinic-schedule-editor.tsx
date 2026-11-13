import { useEffect, useState } from 'react'

import { useClinicActions, useClinicSchedule } from '@/application/hooks'
import type { ClinicSchedule } from '@/domain/entities/clinic.entity'
import { notify } from '@/infrastructure/libs/toast/toast'
import { KitStatusBadge } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'

const DAY_KEYS = ['daySat', 'daySun', 'dayMon', 'dayTue', 'dayWed', 'dayThu', 'dayFri'] as const

export type ClinicScheduleEditorProps = {
  /** When true, omit local Save — parent dirty bar owns persistence via onDirtyChange + exposeSave. */
  embed?: boolean
  onDirtyChange?: (dirty: boolean) => void
  registerSave?: (save: (() => Promise<void>) | null) => void
}

export const ClinicScheduleEditor = ({
  embed = false,
  onDirtyChange,
  registerSave,
}: ClinicScheduleEditorProps) => {
  const { t } = useTranslation('clinic')
  const query = useClinicSchedule()
  const actions = useClinicActions()
  const [draft, setDraft] = useState<ClinicSchedule | null>(null)
  const [baseline, setBaseline] = useState<string>('')

  useEffect(() => {
    if (query.data) {
      const next = structuredClone(query.data)
      setDraft(next)
      setBaseline(JSON.stringify(next))
    }
  }, [query.data])

  useEffect(() => {
    if (!draft) {
      onDirtyChange?.(false)
      return
    }
    onDirtyChange?.(JSON.stringify(draft) !== baseline)
  }, [baseline, draft, onDirtyChange])

  const save = async () => {
    if (!draft) return
    await actions.updateSchedule(draft)
    setBaseline(JSON.stringify(draft))
    notify.success({ title: t('scheduleSaved') })
    query.refetch()
  }

  useEffect(() => {
    if (!embed) {
      registerSave?.(null)
      return
    }
    registerSave?.(save)
    return () => registerSave?.(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- save closes over draft
  }, [embed, draft, registerSave])

  if (!draft) {
    return <p className="text-sm text-muted-foreground">{t('scheduleDescription')}</p>
  }

  const patch = (next: ClinicSchedule) => setDraft(next)

  return (
    <div className="space-y-4">
      {!embed ? (
        <div className="flex justify-end">
          <Button type="button" onClick={() => void save()}>
            {t('save')}
          </Button>
        </div>
      ) : null}

      <section className="space-y-3 rounded-card border border-border bg-card p-4">
        <label className="block max-w-sm space-y-1 text-sm">
          <span>{t('timezone')}</span>
          <Input
            value={draft.timezone}
            onChange={(e) => patch({ ...draft, timezone: e.target.value })}
          />
        </label>

        <div className="space-y-2">
          {draft.weekly.map((slot) => (
            <div
              key={slot.day}
              className="flex flex-wrap items-center gap-2 border-b border-border py-2 text-sm last:border-0"
            >
              <span className="w-16 font-medium">{t(DAY_KEYS[slot.day] ?? 'daySat')}</span>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  checked={slot.enabled}
                  disabled={slot.day === 5}
                  onChange={(e) => {
                    patch({
                      ...draft,
                      weekly: draft.weekly.map((item) =>
                        item.day === slot.day
                          ? { ...item, enabled: slot.day === 5 ? false : e.target.checked }
                          : item,
                      ),
                    })
                  }}
                />
                {slot.enabled ? t('enabled') : t('disabled')}
              </label>
              <Input
                className="h-8 w-28"
                value={slot.open}
                disabled={!slot.enabled}
                onChange={(e) => {
                  patch({
                    ...draft,
                    weekly: draft.weekly.map((item) =>
                      item.day === slot.day ? { ...item, open: e.target.value } : item,
                    ),
                  })
                }}
              />
              <Input
                className="h-8 w-28"
                value={slot.close}
                disabled={!slot.enabled}
                onChange={(e) => {
                  patch({
                    ...draft,
                    weekly: draft.weekly.map((item) =>
                      item.day === slot.day ? { ...item, close: e.target.value } : item,
                    ),
                  })
                }}
              />
              {slot.day === 5 ? <KitStatusBadge tone="neutral" label={t('fridayLocked')} /> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-card border border-border bg-card p-4">
        <h3 className="text-sm font-semibold">{t('timeSlots')}</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {draft.timeSlots.map((slot, index) => (
            <label key={slot.id} className="space-y-1 text-xs">
              <span className="text-muted-foreground">{slot.id}</span>
              <Input
                value={slot.label}
                onChange={(e) => {
                  const timeSlots = draft.timeSlots.map((item, i) =>
                    i === index ? { ...item, label: e.target.value } : item,
                  )
                  patch({ ...draft, timeSlots })
                }}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-card border border-border bg-card p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{t('holidays')}</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              patch({
                ...draft,
                holidays: [
                  ...draft.holidays,
                  {
                    id: `hol-${Date.now()}`,
                    date: new Date().toISOString().slice(0, 10),
                    label: 'Holiday',
                  },
                ],
              })
            }}
          >
            {t('addHoliday')}
          </Button>
        </div>
        {draft.holidays.map((hol, index) => (
          <div key={hol.id} className="flex flex-wrap gap-2">
            <Input
              className="h-8 w-40"
              type="date"
              value={hol.date}
              onChange={(e) => {
                const holidays = draft.holidays.map((item, i) =>
                  i === index ? { ...item, date: e.target.value } : item,
                )
                patch({ ...draft, holidays })
              }}
            />
            <Input
              className="h-8 flex-1"
              value={hol.label}
              onChange={(e) => {
                const holidays = draft.holidays.map((item, i) =>
                  i === index ? { ...item, label: e.target.value } : item,
                )
                patch({ ...draft, holidays })
              }}
            />
          </div>
        ))}
      </section>

      <section className="space-y-3 rounded-card border border-border bg-card p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{t('exceptions')}</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              patch({
                ...draft,
                exceptions: [
                  ...draft.exceptions,
                  {
                    id: `ex-${Date.now()}`,
                    date: new Date().toISOString().slice(0, 10),
                    closed: true,
                    label: 'Exception',
                  },
                ],
              })
            }}
          >
            {t('addException')}
          </Button>
        </div>
        {draft.exceptions.map((ex, index) => (
          <div key={ex.id} className="flex flex-wrap items-center gap-2 text-sm">
            <Input
              className="h-8 w-40"
              type="date"
              value={ex.date}
              onChange={(e) => {
                const exceptions = draft.exceptions.map((item, i) =>
                  i === index ? { ...item, date: e.target.value } : item,
                )
                patch({ ...draft, exceptions })
              }}
            />
            <label className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={ex.closed}
                onChange={(e) => {
                  const exceptions = draft.exceptions.map((item, i) =>
                    i === index ? { ...item, closed: e.target.checked } : item,
                  )
                  patch({ ...draft, exceptions })
                }}
              />
              {t('closed')}
            </label>
            {!ex.closed ? (
              <>
                <Input
                  className="h-8 w-24"
                  value={ex.open ?? '09:00'}
                  onChange={(e) => {
                    const exceptions = draft.exceptions.map((item, i) =>
                      i === index ? { ...item, open: e.target.value } : item,
                    )
                    patch({ ...draft, exceptions })
                  }}
                />
                <Input
                  className="h-8 w-24"
                  value={ex.close ?? '17:00'}
                  onChange={(e) => {
                    const exceptions = draft.exceptions.map((item, i) =>
                      i === index ? { ...item, close: e.target.value } : item,
                    )
                    patch({ ...draft, exceptions })
                  }}
                />
              </>
            ) : null}
            <Input
              className="h-8 flex-1"
              value={ex.label ?? ''}
              onChange={(e) => {
                const exceptions = draft.exceptions.map((item, i) =>
                  i === index ? { ...item, label: e.target.value } : item,
                )
                patch({ ...draft, exceptions })
              }}
            />
          </div>
        ))}
      </section>
    </div>
  )
}
