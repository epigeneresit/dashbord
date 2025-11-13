import { Schema, model } from 'mongoose';

const districtSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true }
  },
  { timestamps: true }
);

districtSchema.index({ name: 1 });

export const DistrictModel = model('District', districtSchema);
