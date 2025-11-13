import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { RoleModel } from '../models/role.model.js';
import { UserModel } from '../models/user.model.js';
import { PermissionModel } from '../models/permission.model.js';

export class RbacController {
  async listUsers(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserModel.find().lean();
      res.json({ items: users });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserModel.create(req.body);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }

  async listRoles(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roles = await RoleModel.find().lean();
      res.json({ items: roles });
    } catch (error) {
      next(error);
    }
  }

  async createRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const role = await RoleModel.create(req.body);
      res.status(StatusCodes.CREATED).json(role);
    } catch (error) {
      next(error);
    }
  }

  async listPermissions(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const permissions = await PermissionModel.find().lean();
      res.json({ items: permissions });
    } catch (error) {
      next(error);
    }
  }
}
