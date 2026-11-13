import type {
  BusinessHours,
  GeneralSettings,
  NotificationPreference,
  TeamInviteInput,
} from '@/domain/entities/settings.entity'
import { memoryStore } from '@/infrastructure/data/memory-store'
import { delay } from '@/infrastructure/data/utils/source.utils'

export const settingsSource = {
  async getGeneral() {
    await delay()
    return memoryStore.general
  },
  async saveGeneral(data: GeneralSettings) {
    await delay()
    memoryStore.general = data
    return data
  },
  async listTeam() {
    await delay()
    return memoryStore.team
  },
  async inviteTeamMember(input: TeamInviteInput) {
    await delay(100)
    const member = {
      id: `team-${Date.now()}`,
      name: input.name,
      email: input.email,
      roleId: input.roleId,
      status: 'invited' as const,
    }
    memoryStore.team = [member, ...memoryStore.team]
    return member
  },
  async deactivateTeamMembers(ids: string[]) {
    await delay(80)
    memoryStore.team = memoryStore.team.map((member) =>
      ids.includes(member.id) ? { ...member, status: 'disabled' } : member,
    )
  },
  async listRoles() {
    await delay()
    return memoryStore.roles
  },
  async saveRolePermissions(roleId: string, permissions: string[]) {
    await delay(80)
    memoryStore.roles = memoryStore.roles.map((role) =>
      role.id === roleId ? { ...role, permissions } : role,
    )
    const updated = memoryStore.roles.find((role) => role.id === roleId)
    if (!updated) throw new Error('Role not found')
    return updated
  },
  async getBusinessHours() {
    await delay()
    return memoryStore.hours
  },
  async saveBusinessHours(data: BusinessHours) {
    await delay()
    memoryStore.hours = data
    return data
  },
  async listNotificationPrefs() {
    await delay()
    return memoryStore.notificationPrefs
  },
  async saveNotificationPrefs(data: NotificationPreference[]) {
    await delay()
    memoryStore.notificationPrefs = data
    return data
  },
  async listApiKeys() {
    await delay()
    return memoryStore.apiKeys.map(({ revealedKey: _r, ...rest }) => rest)
  },
  async revealApiKey(id: string) {
    await delay(60)
    const key = memoryStore.apiKeys.find((item) => item.id === id)
    if (!key) throw new Error('Key not found')
    return key.revealedKey ?? `ic_live_reveal_${id}`
  },
  async listWebhooks() {
    await delay()
    return memoryStore.webhooks
  },
  async testWebhook(id: string) {
    await delay(120)
    memoryStore.webhooks = memoryStore.webhooks.map((hook) =>
      hook.id === id ? { ...hook, lastTestAt: new Date().toISOString() } : hook,
    )
  },
}
