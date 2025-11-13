import { Router } from 'express';

import { can } from '../../middlewares/rbac.js';
import { ApplicationsController } from '../../controllers/applications.controller.js';

const router = Router();
const controller = new ApplicationsController();

router.get('/', (req, res, next) => controller.list(req, res, next));
router.post('/', can('application.write'), (req, res, next) => controller.create(req, res, next));
router.patch('/:id/status', can('application.write'), (req, res, next) => controller.updateStatus(req, res, next));
router.get('/export', can('application.export'), (req, res, next) => controller.export(req, res, next));

export { router as applicationsRouter };
