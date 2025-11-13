import { Schema, model } from 'mongoose';

const departmentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const DepartmentModel = model('Department', departmentSchema);
