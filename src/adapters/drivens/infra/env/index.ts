import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number(),
  APP_URL: z.string(),
  PAYMENT_GATEWAY_ACCESS_TOKEN: z.string(),

  APP_STORAGE_MAX_SIZE: z.number().default(2 * 1024 * 1024),
  APP_STORAGE_PROVIDER: z.enum(['local', 'gcp', 's3']).default('local'),

  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_BUCKET_DESTINATION: z.string(),
  AWS_SESSION_TOKEN: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_COGNITO_ISSUER_URL: z.string(),
  AWS_COGNITO_CLIENT_ID: z.string(),
  AWS_COGNITO_JWKS_URL: z.string(),

  CGP_PROJECT_ID: z.string().default(''),
  GCP_KEY_FILENAME: z.string().default(''),
  GCP_BUCKET_NAME: z.string().default(''),
  GCP_BUCKET_DESTINATION: z.string().default(''),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid envarioment variable', _env.error.format());
  throw new Error('Invalid envarioment variable');
}

export const env = _env.data;
