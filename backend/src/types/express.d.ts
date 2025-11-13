import type { Request } from 'express';

export interface AuthenticatedUser {
  _id: string;
  name: string;
  email: string;
  permissions: string[];
  roles: string[];
  departmentIds?: string[];
  subDepartmentIds?: string[];
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}
