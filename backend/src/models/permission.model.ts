import { Schema, model } from 'mongoose';

const permissionSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    description: { type: String }
  },
  { timestamps: true }
);

export const PermissionModel = model('Permission', permissionSchema);
