import { useAsync } from '@/application/hooks/use-async'
import { repositories } from '@/composition/repositories'

export const useGeneralSettings = () => useAsync(() => repositories.settings.getGeneral(), [])

export const useTeamMembers = () => useAsync(() => repositories.settings.listTeam(), [])

export const useRolesSettings = () => useAsync(() => repositories.settings.listRoles(), [])

export const useBusinessHours = () => useAsync(() => repositories.settings.getBusinessHours(), [])

export const useNotificationPreferences = () =>
  useAsync(() => repositories.settings.listNotificationPrefs(), [])

export const useApiKeys = () => useAsync(() => repositories.settings.listApiKeys(), [])

export const useWebhooks = () => useAsync(() => repositories.settings.listWebhooks(), [])
