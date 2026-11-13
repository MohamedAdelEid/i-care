export interface TeamMember {
  id: string
  name: string
  email: string
  roleId: string
  status: 'active' | 'invited' | 'disabled'
}

export interface Role {
  id: string
  name: string
  permissions: string[]
}

export interface BusinessHoursSlot {
  day: number
  open: string
  close: string
  enabled: boolean
}

export interface BusinessHours {
  timezone: string
  slots: BusinessHoursSlot[]
}

export interface NotificationPreference {
  eventType: string
  group: string
  inApp: boolean
  email: boolean
}

export interface ApiKeySummary {
  id: string
  label: string
  createdAt: string
  lastUsedAt?: string
  maskedKey: string
  /** Full key only returned from revealKey mock. */
  revealedKey?: string
}

export interface WebhookEndpoint {
  id: string
  url: string
  events: string[]
  active: boolean
  lastTestAt?: string
}

export interface GeneralSettings {
  orgName: string
  defaultLanguage: string
  timezone: string
  logoUrl?: string
}

export type TeamInviteInput = {
  name: string
  email: string
  roleId: string
}

export const SETTINGS_PERMISSIONS = [
  'inbox.read',
  'inbox.takeover',
  'agents.write',
  'settings.write',
  'analytics.read',
  'bookings.write',
] as const

export type SettingsPermission = (typeof SETTINGS_PERMISSIONS)[number]
