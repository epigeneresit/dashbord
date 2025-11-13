import { Schema, model } from 'mongoose';

const roleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    permissions: { type: [String], default: [] },
    scope: {
      departmentIds: { type: [Schema.Types.ObjectId], ref: 'Department', default: [] }
    }
  },
  { timestamps: true }
);

export const RoleModel = model('Role', roleSchema);
