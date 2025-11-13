import type { NextFunction, Response } from 'express';

import type { AuthenticatedRequest } from '../types/express.js';

export const can = (...permissions: string[]) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const userPermissions = new Set(req.user?.permissions ?? []);
    const hasAllPermissions = permissions.every((permission) => userPermissions.has(permission));

    if (!hasAllPermissions) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    next();
  };
