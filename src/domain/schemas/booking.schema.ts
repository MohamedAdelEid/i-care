import { z } from 'zod'

const fourPartName = z
  .string()
  .trim()
  .refine((value) => value.split(/\s+/).filter(Boolean).length >= 4, {
    message: 'fourPartName',
  })

/** Egyptian mobile: +20 1[0125]xxxxxxxx or 01[0125]xxxxxxxx */
const egyptianPhone = z
  .string()
  .trim()
  .refine((value) => /^(?:\+20|0)?1[0125]\d{8}$/.test(value.replace(/[\s-]/g, '')), {
    message: 'egyptianPhone',
  })

export const bookingFormSchema = z.object({
  patientName: fourPartName,
  phone: egyptianPhone,
  serviceId: z.enum(['retina', 'lasik', 'pediatric', 'optics', 'cataract']),
  doctorDegree: z.enum(['professor', 'consultant', 'specialist']),
  doctorId: z.string().min(1),
  day: z.string().min(1),
  timeSlot: z.enum(['09-12', '12-15', '15-18', '18-21']),
  cost: z.number().positive(),
  channel: z.enum(['whatsapp', 'telegram', 'manual']),
  status: z.enum([
    'draft_ai',
    'pending_confirmation',
    'confirmed',
    'cancelled',
    'no_show',
  ]),
  conversationId: z.string().optional(),
})

export type BookingFormValues = z.infer<typeof bookingFormSchema>
