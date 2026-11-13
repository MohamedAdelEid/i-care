import { z } from 'zod'

export const generalSettingsSchema = z.object({
  orgName: z.string().min(2),
  defaultLanguage: z.enum(['en', 'ar']),
  timezone: z.string().min(1),
  logoUrl: z.string().optional(),
})

export type GeneralSettingsSchema = z.infer<typeof generalSettingsSchema>

export const teamInviteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  roleId: z.string().min(1),
})

export type TeamInviteSchema = z.infer<typeof teamInviteSchema>
