import type { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { logger } from '../utils/logger.js';

interface ApiError extends Error {
  statusCode?: number;
  details?: unknown;
}

export function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  const statusCode = err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || getReasonPhrase(statusCode);

  logger.error({ err, details: err.details }, 'Unhandled application error');

  return res.status(statusCode).json({
    error: message,
    details: err.details,
    statusCode
  });
}
