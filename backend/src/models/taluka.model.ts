import { Schema, model } from 'mongoose';

const talukaSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    districtCode: { type: String, required: true, index: true },
    name: { type: String, required: true }
  },
  { timestamps: true }
);

talukaSchema.index({ districtCode: 1, name: 1 });

export const TalukaModel = model('Taluka', talukaSchema);
