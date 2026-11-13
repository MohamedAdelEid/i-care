import { z } from 'zod'

export const createLoginSchema = (messages: {
  emailRequired: string
  emailInvalid: string
  passwordMin: string
}) =>
  z.object({
    email: z.string().min(1, messages.emailRequired).email(messages.emailInvalid),
    password: z.string().min(6, messages.passwordMin),
    rememberMe: z.boolean().optional(),
  })

export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>
