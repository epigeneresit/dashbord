import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(200)
    .default(25),
  sort: z.string().optional(),
  search: z.string().optional()
});

export const applicationFilterSchema = paginationSchema.extend({
  department: z.string().optional(),
  subDepartment: z.string().optional(),
  scheme: z.string().optional(),
  district: z.string().optional(),
  taluka: z.string().optional(),
  status: z
    .string()
    .optional()
    .transform((value) => value?.split(',').filter(Boolean)),
  fy: z
    .string()
    .optional()
    .transform((value) => value?.split(',').filter(Boolean)),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  gender: z.string().optional(),
  category: z.string().optional()
});
