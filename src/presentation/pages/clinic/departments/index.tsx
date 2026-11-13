import { useEffect, useState } from 'react'

import { useClinicActions, useClinicDepartments } from '@/application/hooks'
import type { ClinicDepartment } from '@/domain/entities/clinic.entity'
import { notify } from '@/infrastructure/libs/toast/toast'
import { KitEntityDrawer, KitPageHeader, KitStatusBadge } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { Textarea } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'

export const ClinicDepartmentsPage = () => {
  const { t } = useTranslation('clinic')
  const list = useClinicDepartments()
  const actions = useClinicActions()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<ClinicDepartment | null>(null)
  const [hours, setHours] = useState('')
  const [rules, setRules] = useState('')
  const [members, setMembers] = useState('')

  useEffect(() => {
    if (!active) return
    setHours(active.workingHours)
    setRules(active.handoffRules.join('\n'))
    setMembers(active.members.map((m) => `${m.name} | ${m.role}`).join('\n'))
  }, [active])

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader title={t('departmentsTitle')} description={t('departmentsDescription')} />

      <div className="grid gap-3 md:grid-cols-3">
        {(list.data ?? []).map((dept) => (
          <article key={dept.id} className="rounded-card border border-border bg-card p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold">{dept.name}</h3>
              <KitStatusBadge tone="info" label={`${dept.members.length}`} />
            </div>
            <div className="text-xs space-y-1">
              <p className="text-muted-foreground">{t('workingHours')}</p>
              <p>{dept.workingHours}</p>
            </div>
            <div className="text-xs space-y-1">
              <p className="text-muted-foreground">{t('members')}</p>
              <ul className="space-y-0.5">
                {dept.members.map((m) => (
                  <li key={m.id}>
                    {m.name} · {m.role}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-xs space-y-1">
              <p className="text-muted-foreground">{t('handoffRules')}</p>
              <ul className="list-disc ps-4 space-y-0.5">
                {dept.handoffRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setActive(dept)
                setOpen(true)
              }}
            >
              {t('editDepartment')}
            </Button>
          </article>
        ))}
      </div>

      <KitEntityDrawer open={open} onOpenChange={setOpen} title={active?.name ?? t('editDepartment')}>
        <div className="space-y-3">
          <label className="block space-y-1 text-sm">
            <span>{t('workingHours')}</span>
            <Input value={hours} onChange={(e) => setHours(e.target.value)} />
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('members')}</span>
            <Textarea
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              placeholder="Name | Role"
            />
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('handoffRules')}</span>
            <Textarea value={rules} onChange={(e) => setRules(e.target.value)} />
          </label>
          <Button
            type="button"
            onClick={() => {
              if (!active) return
              const parsedMembers = members
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line, i) => {
                  const [name, role] = line.split('|').map((part) => part.trim())
                  return {
                    id: active.members[i]?.id ?? `m-${active.id}-${i}`,
                    name: name || `Member ${i + 1}`,
                    role: role || 'Agent',
                  }
                })
              void actions
                .updateDepartment(active.id, {
                  workingHours: hours,
                  handoffRules: rules
                    .split('\n')
                    .map((line) => line.trim())
                    .filter(Boolean),
                  members: parsedMembers,
                })
                .then(() => {
                  notify.success({ title: t('updateSuccess') })
                  setOpen(false)
                  list.refetch()
                })
            }}
          >
            {t('save')}
          </Button>
        </div>
      </KitEntityDrawer>
    </div>
  )
}
