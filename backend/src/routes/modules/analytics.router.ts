import { Router } from 'express';

import { AnalyticsController } from '../../controllers/analytics.controller.js';

const router = Router();
const controller = new AnalyticsController();

router.get('/kpis', (req, res, next) => controller.kpis(req, res, next));
router.get('/applications/by-month', (req, res, next) => controller.applicationsByMonth(req, res, next));
router.get('/status-pie', (req, res, next) => controller.statusPie(req, res, next));
router.get('/allocations/by-department', (req, res, next) => controller.allocationsByDepartment(req, res, next));
router.get('/treemap', (req, res, next) => controller.treemap(req, res, next));
router.get('/district-heatmap', (req, res, next) => controller.districtHeatmap(req, res, next));

export { router as analyticsRouter };
