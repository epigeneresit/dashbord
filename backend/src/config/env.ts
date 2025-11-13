import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  JWT_ACCESS_PUBLIC_KEY: z.string().min(1, 'JWT access public key is required'),
  JWT_ACCESS_PRIVATE_KEY: z.string().min(1, 'JWT access private key is required'),
  JWT_REFRESH_PUBLIC_KEY: z.string().min(1, 'JWT refresh public key is required'),
  JWT_REFRESH_PRIVATE_KEY: z.string().min(1, 'JWT refresh private key is required'),
  ACCESS_TOKEN_TTL: z.string().default('15m'),
  REFRESH_TOKEN_TTL: z.string().default('7d'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(8).default(12),
  ALLOWED_ORIGINS: z.string().optional(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('❌ Invalid environment configuration', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment configuration');
}

export const env = parsed.data;

export const isProduction = env.NODE_ENV === 'production';
