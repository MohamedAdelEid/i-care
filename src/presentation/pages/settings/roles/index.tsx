import { useEffect, useState } from 'react'

import { useRolesSettings, useSettingsActions } from '@/application/hooks'
import { SETTINGS_PERMISSIONS } from '@/domain/entities/settings.entity'
import { AsyncBoundary } from '@/presentation/components/shared/async-boundary'
import { Checkbox } from '@/presentation/components/ui/checkbox'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { useSettingsShell } from '../settings-shell'

export const SettingsRolesPage = () => {
  const { t } = useTranslation('settings')
  const roles = useRolesSettings()
  const { saveRolePermissions } = useSettingsActions()
  const { setDirty, registerSave } = useSettingsShell()
  const [matrix, setMatrix] = useState<Record<string, string[]>>({})
  const [baseline, setBaseline] = useState('')

  useEffect(() => {
    if (!roles.data) return
    const next: Record<string, string[]> = {}
    for (const role of roles.data) next[role.id] = [...role.permissions]
    setMatrix(next)
    setBaseline(JSON.stringify(next))
  }, [roles.data])

  useEffect(() => {
    setDirty(JSON.stringify(matrix) !== baseline && baseline !== '')
  }, [baseline, matrix, setDirty])

  useEffect(() => {
    registerSave(async () => {
      for (const [roleId, permissions] of Object.entries(matrix)) {
        await saveRolePermissions(roleId, permissions)
      }
      setBaseline(JSON.stringify(matrix))
      roles.refetch()
    })
    return () => registerSave(null)
  }, [matrix, registerSave, roles, saveRolePermissions])

  const toggle = (roleId: string, permission: string, checked: boolean) => {
    setMatrix((prev) => {
      const current = prev[roleId] ?? []
      const next = checked
        ? [...new Set([...current, permission])]
        : current.filter((item) => item !== permission)
      return { ...prev, [roleId]: next }
    })
  }

  return (
    <AsyncBoundary isLoading={roles.isLoading} error={roles.error} onRetry={roles.refetch}>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{t('rolesTitle')}</h2>
          <p className="text-sm text-muted-foreground">{t('rolesDescription')}</p>
        </div>

        <div className="overflow-x-auto rounded-card border border-border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-3 py-2 font-medium">{t('colPermission')}</th>
                {(roles.data ?? []).map((role) => (
                  <th key={role.id} className="px-3 py-2 font-medium">
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SETTINGS_PERMISSIONS.map((permission) => (
                <tr key={permission} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 text-muted-foreground">{permission}</td>
                  {(roles.data ?? []).map((role) => (
                    <td key={role.id} className="px-3 py-2">
                      <Checkbox
                        checked={(matrix[role.id] ?? []).includes(permission)}
                        onCheckedChange={(value) =>
                          toggle(role.id, permission, value === true)
                        }
                        aria-label={`${role.name} ${permission}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AsyncBoundary>
  )
}
