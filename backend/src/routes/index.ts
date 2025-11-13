import { Router } from 'express';

import { authenticate } from '../middlewares/auth.js';
import { can } from '../middlewares/rbac.js';
import { DepartmentModel } from '../models/department.model.js';
import { SubDepartmentModel } from '../models/sub-department.model.js';
import { SchemeModel } from '../models/scheme.model.js';
import { AllocationModel } from '../models/allocation.model.js';
import { analyticsRouter } from './modules/analytics.router.js';
import { applicationsRouter } from './modules/applications.router.js';
import { authRouter } from './modules/auth.router.js';
import { createHierarchyRouter } from './modules/hierarchy.router.js';
import { rbacRouter } from './modules/rbac.router.js';

const router = Router();

router.use('/auth', authRouter);

router.use(
  '/departments',
  authenticate,
  can('department.read'),
  createHierarchyRouter(DepartmentModel, 'department.write')
);
router.use(
  '/sub-departments',
  authenticate,
  can('subdept.read'),
  createHierarchyRouter(SubDepartmentModel, 'subdept.write')
);
router.use(
  '/schemes',
  authenticate,
  can('scheme.read'),
  createHierarchyRouter(SchemeModel, 'scheme.write')
);
router.use(
  '/allocations',
  authenticate,
  can('allocation.read'),
  createHierarchyRouter(AllocationModel, 'allocation.write')
);
router.use('/applications', authenticate, can('application.read'), applicationsRouter);
router.use('/analytics', authenticate, can('analytics.read'), analyticsRouter);
router.use('/admin', authenticate, can('user.read'), rbacRouter);

export default router;
