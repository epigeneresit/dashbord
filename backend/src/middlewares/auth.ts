import type { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { env } from '../config/env.js';
import { UserModel } from '../models/user.model.js';
import type { AuthenticatedRequest } from '../types/express.js';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_ACCESS_PUBLIC_KEY,
      algorithms: ['RS256']
    },
    async (payload, done) => {
      try {
        const user = await UserModel.findById(payload.sub).lean();
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    (req as AuthenticatedRequest).user = user;
    return next();
  })(req, res, next);
}
