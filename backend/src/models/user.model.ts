import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String },
    passwordHash: { type: String, required: true, select: false },
    status: { type: String, enum: ['ACTIVE', 'DISABLED'], default: 'ACTIVE' },
    roles: { type: [Schema.Types.ObjectId], ref: 'Role', default: [] },
    permissions: { type: [String], default: [] },
    departmentIds: { type: [Schema.Types.ObjectId], ref: 'Department', default: [] },
    subDepartmentIds: { type: [Schema.Types.ObjectId], ref: 'SubDepartment', default: [] },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

export const UserModel = model('User', userSchema);
