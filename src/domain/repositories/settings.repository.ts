import type {
  ApiKeySummary,
  BusinessHours,
  GeneralSettings,
  NotificationPreference,
  Role,
  TeamInviteInput,
  TeamMember,
  WebhookEndpoint,
} from '@/domain/entities/settings.entity'

export interface ISettingsRepository {
  getGeneral(): Promise<GeneralSettings>
  saveGeneral(data: GeneralSettings): Promise<GeneralSettings>
  listTeam(): Promise<TeamMember[]>
  inviteTeamMember(input: TeamInviteInput): Promise<TeamMember>
  deactivateTeamMembers(ids: string[]): Promise<void>
  listRoles(): Promise<Role[]>
  saveRolePermissions(roleId: string, permissions: string[]): Promise<Role>
  getBusinessHours(): Promise<BusinessHours>
  saveBusinessHours(data: BusinessHours): Promise<BusinessHours>
  listNotificationPrefs(): Promise<NotificationPreference[]>
  saveNotificationPrefs(data: NotificationPreference[]): Promise<NotificationPreference[]>
  listApiKeys(): Promise<ApiKeySummary[]>
  revealApiKey(id: string): Promise<string>
  listWebhooks(): Promise<WebhookEndpoint[]>
  testWebhook(id: string): Promise<void>
}
