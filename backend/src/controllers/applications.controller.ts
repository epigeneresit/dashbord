import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ApplicationsService } from '../services/applications.service.js';

export class ApplicationsController {
  private readonly service = new ApplicationsService();

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.service.list(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const application = await this.service.create(req.body, req);
      res.status(StatusCodes.CREATED).json(application);
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updated = await this.service.updateStatus(req.params.id, req.body, req);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  };

  export = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stream = await this.service.export(req.query);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="applications.csv"');
      stream.pipe(res);
    } catch (error) {
      next(error);
    }
  };
}
