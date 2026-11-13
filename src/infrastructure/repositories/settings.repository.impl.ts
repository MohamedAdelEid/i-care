import type { ISettingsRepository } from '@/domain/repositories/settings.repository'
import { settingsSource } from '@/infrastructure/data/sources/settings.source'

export class SettingsRepository implements ISettingsRepository {
  getGeneral = settingsSource.getGeneral
  saveGeneral = settingsSource.saveGeneral
  listTeam = settingsSource.listTeam
  inviteTeamMember = settingsSource.inviteTeamMember
  deactivateTeamMembers = settingsSource.deactivateTeamMembers
  listRoles = settingsSource.listRoles
  saveRolePermissions = settingsSource.saveRolePermissions
  getBusinessHours = settingsSource.getBusinessHours
  saveBusinessHours = settingsSource.saveBusinessHours
  listNotificationPrefs = settingsSource.listNotificationPrefs
  saveNotificationPrefs = settingsSource.saveNotificationPrefs
  listApiKeys = settingsSource.listApiKeys
  revealApiKey = settingsSource.revealApiKey
  listWebhooks = settingsSource.listWebhooks
  testWebhook = settingsSource.testWebhook
}
