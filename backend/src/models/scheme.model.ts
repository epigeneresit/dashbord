import { Schema, Types, model } from 'mongoose';

const schemeSchema = new Schema(
  {
    departmentId: { type: Types.ObjectId, ref: 'Department', required: true, index: true },
    subDepartmentId: { type: Types.ObjectId, ref: 'SubDepartment', required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    eligibility: {
      ageMin: Number,
      ageMax: Number,
      genders: { type: [String], default: [] },
      categories: { type: [String], default: [] }
    },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

schemeSchema.index({ departmentId: 1, subDepartmentId: 1 });

export const SchemeModel = model('Scheme', schemeSchema);
