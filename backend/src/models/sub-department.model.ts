import { Schema, Types, model } from 'mongoose';

const subDepartmentSchema = new Schema(
  {
    departmentId: { type: Types.ObjectId, ref: 'Department', required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

subDepartmentSchema.index({ departmentId: 1, code: 1 }, { unique: true });

export const SubDepartmentModel = model('SubDepartment', subDepartmentSchema);
