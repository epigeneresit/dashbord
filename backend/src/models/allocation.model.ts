import { Schema, Types, model } from 'mongoose';

const allocationSchema = new Schema(
  {
    schemeId: { type: Types.ObjectId, ref: 'Scheme', required: true, index: true },
    financialYear: { type: String, required: true },
    amountAllotted: { type: Number, required: true },
    amountReleased: { type: Number, default: 0 },
    amountUtilized: { type: Number, default: 0 },
    notes: { type: String }
  },
  { timestamps: true }
);

allocationSchema.index({ schemeId: 1, financialYear: 1 }, { unique: true });

export const AllocationModel = model('Allocation', allocationSchema);
