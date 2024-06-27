import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number(),
  APP_URL: z.string(),
  PAYMENT_GATEWAY_ACCESS_TOKEN: z.string(),
  GCP_BUCKET_NAME:z.string(),
  GCP_KEY_FILENAME:z.string(),
  CGP_PROJECT_ID:z.string(),
  GCP_BUCKET_DESTINATION:z.string().default(''),
  APP_STORAGE_MAX_SIZE: z.number().default(2 * 1024 * 1024)
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid envarioment variable', _env.error.format())
  throw new Error('Invalid envarioment variable')
}

export const env = _env.data
