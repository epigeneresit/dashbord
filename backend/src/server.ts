import app from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

async function bootstrap(): Promise<void> {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      logger.info(`🚀 Server ready on port ${env.PORT}`);
    });
  } catch (error) {
    logger.fatal({ err: error }, 'Failed to start server');
    process.exit(1);
  }
}

void bootstrap();
