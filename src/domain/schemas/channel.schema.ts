import { z } from 'zod'

export const channelSetupSchema = z.object({
  credentials: z.string().trim().min(8, { message: 'required' }),
  webhookUrl: z.string().trim().url({ message: 'url' }),
  testMessage: z.string().trim().min(1, { message: 'required' }).optional(),
})

export type ChannelSetupFormValues = z.infer<typeof channelSetupSchema>
