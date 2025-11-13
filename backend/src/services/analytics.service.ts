import { Types } from 'mongoose';

import { AllocationModel } from '../models/allocation.model.js';
import { ApplicationModel } from '../models/application.model.js';

function buildMatch(filters: Record<string, unknown>) {
  const match: Record<string, unknown> = {};
  if (filters.schemeId) {
    match.schemeId = new Types.ObjectId(String(filters.schemeId));
  }
  if (filters.departmentId) {
    match.departmentId = new Types.ObjectId(String(filters.departmentId));
  }
  if (filters.subDepartmentId) {
    match.subDepartmentId = new Types.ObjectId(String(filters.subDepartmentId));
  }
  if (filters.status) {
    match['status.value'] = { $in: String(filters.status).split(',') };
  }
  if (filters.district) {
    match['applicant.address.districtCode'] = filters.district;
  }
  if (filters.from || filters.to) {
    match.filedAt = {
      ...(filters.from ? { $gte: new Date(String(filters.from)) } : {}),
      ...(filters.to ? { $lte: new Date(String(filters.to)) } : {})
    };
  }
  return match;
}

export class AnalyticsService {
  async getKpis(rawFilters: Record<string, unknown>) {
    const match = buildMatch(rawFilters);

    const [applications, statusCounts, allocation] = await Promise.all([
      ApplicationModel.countDocuments(match),
      ApplicationModel.aggregate([
        { $match: match },
        {
          $group: {
            _id: '$status.value',
            count: { $sum: 1 }
          }
        }
      ]),
      AllocationModel.aggregate([
        {
          $match: rawFilters.fy ? { financialYear: rawFilters.fy } : {}
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amountAllotted' }
          }
        }
      ])
    ]);

    const statusMap = Object.fromEntries(statusCounts.map((item) => [item._id, item.count]));

    return {
      totalApplications: applications,
      approved: statusMap.APPROVED ?? 0,
      rejected: statusMap.REJECTED ?? 0,
      pending: statusMap.PENDING ?? 0,
      totalAllocation: allocation[0]?.total ?? 0
    };
  }

  async getStatusPie(rawFilters: Record<string, unknown>) {
    const match = buildMatch(rawFilters);

    return ApplicationModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$status.value',
          count: { $sum: 1 }
        }
      }
    ]);
  }

  async getAllocationVsUtilization(rawFilters: Record<string, unknown>) {
    const match = rawFilters.fy ? { financialYear: rawFilters.fy } : {};

    return AllocationModel.aggregate([
      { $match: match },
      {
        $lookup: {
          from: 'schemes',
          localField: 'schemeId',
          foreignField: '_id',
          as: 'scheme'
        }
      },
      { $unwind: '$scheme' },
      {
        $lookup: {
          from: 'departments',
          localField: 'scheme.departmentId',
          foreignField: '_id',
          as: 'department'
        }
      },
      { $unwind: '$department' },
      {
        $group: {
          _id: '$department.name',
          allotted: { $sum: '$amountAllotted' },
          utilized: { $sum: '$amountUtilized' },
          released: { $sum: '$amountReleased' }
        }
      },
      { $sort: { allotted: -1 } }
    ]);
  }

  async getApplicationsByMonth(rawFilters: Record<string, unknown>) {
    const match = buildMatch(rawFilters);

    return ApplicationModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: '$filedAt' },
            month: { $month: '$filedAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1
        }
      }
    ]);
  }

  async getTreemap(rawFilters: Record<string, unknown>) {
    const match = buildMatch(rawFilters);

    return ApplicationModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            departmentId: '$departmentId',
            subDepartmentId: '$subDepartmentId',
            schemeId: '$schemeId'
          },
          count: { $sum: 1 }
        }
      }
    ]);
  }

  async getDistrictHeatmap(rawFilters: Record<string, unknown>) {
    const match = buildMatch(rawFilters);

    return ApplicationModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$applicant.address.districtCode',
          count: { $sum: 1 },
          amount: { $sum: '$amountSanctioned' }
        }
      }
    ]);
  }
}
