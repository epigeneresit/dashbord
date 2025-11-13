import pino from 'pino';

import { env, isProduction } from '../config/env.js';

export const logger = pino({
  name: 'dashboard-backend',
  level: env.LOG_LEVEL,
  transport: isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard'
        }
      }
});
