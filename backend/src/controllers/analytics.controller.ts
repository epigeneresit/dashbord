import type { NextFunction, Request, Response } from 'express';

import { AnalyticsService } from '../services/analytics.service.js';

export class AnalyticsController {
  private readonly service = new AnalyticsService();

  kpis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getKpis(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  statusPie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getStatusPie(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  allocationsByDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAllocationVsUtilization(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  applicationsByMonth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getApplicationsByMonth(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  treemap = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getTreemap(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  districtHeatmap = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getDistrictHeatmap(req.query);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}
