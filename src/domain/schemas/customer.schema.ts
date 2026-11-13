import { z } from 'zod'

/** Egyptian mobile: +20 1[0125]xxxxxxxx or 01[0125]xxxxxxxx */
const egyptianPhone = z
  .string()
  .trim()
  .refine((value) => /^(?:\+20|0)?1[0125]\d{8}$/.test(value.replace(/[\s-]/g, '')), {
    message: 'egyptianPhone',
  })

export const customerFormSchema = z.object({
  displayName: z.string().trim().min(2, { message: 'required' }),
  phone: egyptianPhone,
  email: z
    .string()
    .trim()
    .email({ message: 'email' })
    .optional()
    .or(z.literal('')),
  preferredLanguage: z.enum(['en', 'ar']),
  status: z.enum(['active', 'inactive', 'blocked']),
  hasInsurance: z.boolean(),
  tags: z.string().optional(),
  channelType: z.enum(['whatsapp', 'telegram']),
})

export type CustomerFormValues = z.infer<typeof customerFormSchema>
