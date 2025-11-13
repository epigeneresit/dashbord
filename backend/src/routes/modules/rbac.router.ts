import { Router } from 'express';

import { can } from '../../middlewares/rbac.js';
import { RbacController } from '../../controllers/rbac.controller.js';

const router = Router();
const controller = new RbacController();

router.get('/users', (req, res, next) => controller.listUsers(req, res, next));
router.post('/users', can('user.write'), (req, res, next) => controller.createUser(req, res, next));
router.get('/roles', can('role.read'), (req, res, next) => controller.listRoles(req, res, next));
router.post('/roles', can('role.write'), (req, res, next) => controller.createRole(req, res, next));
router.get('/permissions', can('role.read'), (req, res, next) => controller.listPermissions(req, res, next));

export { router as rbacRouter };
