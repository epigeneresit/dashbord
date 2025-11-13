import { Schema, Types, model } from 'mongoose';

const documentSchema = new Schema(
  {
    name: String,
    url: String,
    type: String
  },
  { _id: false }
);

const applicationSchema = new Schema(
  {
    schemeId: { type: Types.ObjectId, ref: 'Scheme', required: true, index: true },
    departmentId: { type: Types.ObjectId, ref: 'Department', required: true },
    subDepartmentId: { type: Types.ObjectId, ref: 'SubDepartment', required: true },
    applicant: {
      name: { type: String, required: true },
      gender: { type: String, required: true },
      dob: { type: Date },
      mobile: { type: String },
      email: { type: String },
      aadhaarHash: { type: String, select: false },
      address: {
        state: { type: String, default: 'MH' },
        districtCode: { type: String, required: true },
        talukaCode: { type: String },
        pincode: { type: String }
      }
    },
    meta: {
      category: { type: String },
      incomeBracket: { type: String },
      disability: { type: Boolean }
    },
    status: {
      value: {
        type: String,
        enum: ['APPLIED', 'APPROVED', 'REJECTED', 'PENDING'],
        default: 'APPLIED'
      },
      at: { type: Date, default: Date.now },
      byUserId: { type: Types.ObjectId, ref: 'User' }
    },
    amountSanctioned: { type: Number },
    filedAt: { type: Date, default: Date.now },
    decidedAt: { type: Date },
    docs: { type: [documentSchema], default: [] },
    audit: {
      createdBy: { type: Types.ObjectId, ref: 'User' },
      updatedBy: { type: Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }
  },
  { timestamps: true }
);

applicationSchema.index({ schemeId: 1, 'status.value': 1, filedAt: -1 });
applicationSchema.index({ 'applicant.address.districtCode': 1, 'applicant.address.talukaCode': 1 });
applicationSchema.index({ departmentId: 1, subDepartmentId: 1 });

export const ApplicationModel = model('Application', applicationSchema);
