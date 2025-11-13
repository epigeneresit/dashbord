import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { UserModel } from '../models/user.model.js';
import { logger } from '../utils/logger.js';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password: rawPassword } = req.body;
      const user = await UserModel.findOne({ email }).select('+passwordHash').lean();

      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid credentials' });
        return;
      }

      // TODO: verify password & 2FA
      void rawPassword;

      const accessToken = jwt.sign({ sub: user._id }, env.JWT_ACCESS_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: env.ACCESS_TOKEN_TTL
      });

      const refreshToken = jwt.sign({ sub: user._id }, env.JWT_REFRESH_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: env.REFRESH_TOKEN_TTL
      });

      res.json({ accessToken, refreshToken });
    } catch (error) {
      logger.error({ err: error }, 'Failed to login');
      next(error);
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const { token } = req.body ?? {};
    if (!token) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: 'Refresh token missing' });
      return;
    }
    try {
      const payload = jwt.verify(token, env.JWT_REFRESH_PUBLIC_KEY, { algorithms: ['RS256'] });
      const accessToken = jwt.sign({ sub: (payload as jwt.JwtPayload).sub }, env.JWT_ACCESS_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: env.ACCESS_TOKEN_TTL
      });
      res.json({ accessToken });
    } catch (error) {
      logger.warn({ err: error }, 'Invalid refresh token');
      res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid refresh token' });
    }
  }

  async logout(_req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.NO_CONTENT).send();
  }
}
