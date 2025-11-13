import { Readable } from 'node:stream';

import type { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { z } from 'zod';

import { ApplicationModel } from '../models/application.model.js';
import { AuditLogModel } from '../models/audit-log.model.js';
import { applicationFilterSchema } from '../schemas/filter.schema.js';
import type { AuthenticatedRequest } from '../types/express.js';

export class ApplicationsService {
  async list(rawQuery: unknown) {
    const filters = applicationFilterSchema.parse(rawQuery);
    const { page, pageSize, sort, search, status, fy, from, to, department, subDepartment, scheme } = filters;

    void fy;

    const query: Record<string, unknown> = {};

    if (status?.length) {
      query['status.value'] = { $in: status };
    }
    if (department) {
      query.departmentId = new Types.ObjectId(department);
    }
    if (subDepartment) {
      query.subDepartmentId = new Types.ObjectId(subDepartment);
    }
    if (scheme) {
      query.schemeId = new Types.ObjectId(scheme);
    }
    if (from || to) {
      query.filedAt = {
        ...(from ? { $gte: new Date(from) } : {}),
        ...(to ? { $lte: new Date(to) } : {})
      };
    }
    if (filters.district) {
      query['applicant.address.districtCode'] = filters.district;
    }
    if (filters.taluka) {
      query['applicant.address.talukaCode'] = filters.taluka;
    }
    if (filters.gender) {
      query['applicant.gender'] = filters.gender;
    }
    if (filters.category) {
      query['meta.category'] = filters.category;
    }
    if (search) {
      query.$text = { $search: search };
    }

    const sortStage = sort
      ? Object.fromEntries(
          sort.split(',').map((entry) => {
            const [field, direction] = entry.split(':');
            return [field, direction === 'desc' ? -1 : 1];
          })
        )
      : { filedAt: -1 };

    const [items, total] = await Promise.all([
      ApplicationModel.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort(sortStage)
        .lean(),
      ApplicationModel.countDocuments(query)
    ]);

    return {
      items,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    };
  }

  async create(body: unknown, req: Request) {
    const createSchema = z.object({
      schemeId: z.string(),
      departmentId: z.string(),
      subDepartmentId: z.string(),
      applicant: z.object({
        name: z.string(),
        gender: z.string(),
        districtCode: z.string(),
        talukaCode: z.string().optional(),
        category: z.string().optional()
      })
    });

    const payload = createSchema.parse(body);

    const application = await ApplicationModel.create({
      schemeId: payload.schemeId,
      departmentId: payload.departmentId,
      subDepartmentId: payload.subDepartmentId,
      applicant: {
        name: payload.applicant.name,
        gender: payload.applicant.gender,
        address: {
          districtCode: payload.applicant.districtCode,
          talukaCode: payload.applicant.talukaCode
        }
      },
      meta: {
        category: payload.applicant.category
      }
    });

    await AuditLogModel.create({
      userId: (req as AuthenticatedRequest).user?._id,
      action: 'application.create',
      entity: 'Application',
      entityId: application._id,
      payload: payload
    });

    return application.toJSON();
  }

  async updateStatus(id: string, body: unknown, req: Request) {
    const schema = z.object({
      value: z.enum(['APPLIED', 'APPROVED', 'REJECTED', 'PENDING']),
      decidedAt: z.string().datetime().optional()
    });
    const payload = schema.parse(body);

    const application = await ApplicationModel.findByIdAndUpdate(
      id,
      {
        status: { value: payload.value, at: new Date(), byUserId: (req as AuthenticatedRequest).user?._id },
        decidedAt: payload.decidedAt ? new Date(payload.decidedAt) : undefined
      },
      { new: true }
    ).lean();

    if (!application) {
      const error = new Error('Application not found');
      (error as Error & { statusCode?: number }).statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    await AuditLogModel.create({
      userId: (req as AuthenticatedRequest).user?._id,
      action: 'application.updateStatus',
      entity: 'Application',
      entityId: new Types.ObjectId(id),
      payload
    });

    return application;
  }

  async export(rawQuery: unknown): Promise<Readable> {
    const { items } = await this.list(rawQuery);

    const headers = ['Applicant Name', 'District', 'Scheme', 'Status', 'Filed At', 'Decided At'];
    const rows = items.map((item) => [
      item.applicant?.name ?? '',
      item.applicant?.address?.districtCode ?? '',
      item.schemeId?.toString() ?? '',
      item.status?.value ?? '',
      item.filedAt ? new Date(item.filedAt).toISOString() : '',
      item.decidedAt ? new Date(item.decidedAt).toISOString() : ''
    ]);

    const csv = [headers, ...rows]
      .map((columns) => columns.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    return Readable.from(csv);
  }
}
