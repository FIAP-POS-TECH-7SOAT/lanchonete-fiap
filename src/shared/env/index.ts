import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number(),
  APP_URL: z.string(),
  PAYMENT_GATEWAY_ACCESS_TOKEN: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid envarioment variable', _env.error.format())
  throw new Error('Invalid envarioment variable')
}

export const env = _env.data
