import { useCallback } from 'react'

import type {
  BusinessHours,
  NotificationPreference,
  TeamInviteInput,
} from '@/domain/entities/settings.entity'
import type { GeneralSettingsSchema } from '@/domain/schemas'
import { repositories } from '@/composition/repositories'

export const useSettingsActions = () => {
  const saveGeneral = useCallback(
    (values: GeneralSettingsSchema) => repositories.settings.saveGeneral(values),
    [],
  )

  const saveBusinessHours = useCallback(
    (values: BusinessHours) => repositories.settings.saveBusinessHours(values),
    [],
  )

  const saveNotificationPrefs = useCallback(
    (values: NotificationPreference[]) => repositories.settings.saveNotificationPrefs(values),
    [],
  )

  const inviteTeamMember = useCallback(
    (input: TeamInviteInput) => repositories.settings.inviteTeamMember(input),
    [],
  )

  const deactivateTeamMembers = useCallback(
    (ids: string[]) => repositories.settings.deactivateTeamMembers(ids),
    [],
  )

  const saveRolePermissions = useCallback(
    (roleId: string, permissions: string[]) =>
      repositories.settings.saveRolePermissions(roleId, permissions),
    [],
  )

  const revealApiKey = useCallback(
    (id: string) => repositories.settings.revealApiKey(id),
    [],
  )

  const testWebhook = useCallback(
    (id: string) => repositories.settings.testWebhook(id),
    [],
  )

  return {
    saveGeneral,
    saveBusinessHours,
    saveNotificationPrefs,
    inviteTeamMember,
    deactivateTeamMembers,
    saveRolePermissions,
    revealApiKey,
    testWebhook,
  }
}
