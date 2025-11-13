import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

import { env } from './config/env.js';
import { errorHandler } from './middlewares/error-handler.js';
import routes from './routes/index.js';

const app = express();

const corsOrigins = env.ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()) ?? ['*'];

app.use(
  cors({
    origin: corsOrigins,
    credentials: true
  })
);
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(passport.initialize());

app.use('/api', routes);

app.use(errorHandler);

export default app;
