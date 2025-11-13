import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { Model } from 'mongoose';

export class HierarchyController<T extends object> {
  constructor(private readonly model: Model<T>) {}

  list = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const items = await this.model.find().lean();
      res.json({ items });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const entity = await this.model.create(req.body);
      res.status(StatusCodes.CREATED).json(entity);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const entity = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
      if (!entity) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Entity not found' });
        return;
      }
      res.json(entity);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.model.findByIdAndDelete(req.params.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };
}
