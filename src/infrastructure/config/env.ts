import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_API_TIMEOUT: z.coerce.number().positive().default(15000),
  VITE_API_UPLOAD_TIMEOUT: z.coerce.number().positive().default(120000),
  VITE_APP_NAME: z.string().default('Bublz'),
  VITE_SITE_URL: z.preprocess((value) => {
    if (typeof value !== 'string') return ''
    return value.trim().replace(/\/$/, '')
  }, z.union([z.literal(''), z.string().url()])),
  VITE_GOOGLE_CLIENT_ID: z.string().optional().default(''),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  console.error('Invalid environment variables:', z.treeifyError(parsed.error))
  throw new Error('Invalid environment variables. Check your .env file.')
}

export const env = {
  apiBaseUrl: parsed.data.VITE_API_BASE_URL,
  apiTimeout: parsed.data.VITE_API_TIMEOUT,
  apiUploadTimeout: parsed.data.VITE_API_UPLOAD_TIMEOUT,
  appName: parsed.data.VITE_APP_NAME,
  siteUrl: parsed.data.VITE_SITE_URL,
  googleClientId: parsed.data.VITE_GOOGLE_CLIENT_ID.trim(),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
