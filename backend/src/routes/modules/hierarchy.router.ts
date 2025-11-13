import { Router } from 'express';
import type { Model } from 'mongoose';

import { can } from '../../middlewares/rbac.js';
import { HierarchyController } from '../../controllers/hierarchy.controller.js';

export function createHierarchyRouter<T extends object>(model: Model<T>, writePermission: string) {
  const router = Router();
  const controller = new HierarchyController(model);

  router.get('/', (req, res, next) => controller.list(req, res, next));
  router.post('/', can(writePermission), (req, res, next) => controller.create(req, res, next));
  router.patch('/:id', can(writePermission), (req, res, next) => controller.update(req, res, next));
  router.delete('/:id', can(writePermission), (req, res, next) => controller.remove(req, res, next));

  return router;
}
