import { Schema, model } from 'mongoose';

const auditLogSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: { type: Schema.Types.ObjectId },
    payload: { type: Schema.Types.Mixed },
    ip: { type: String },
    userAgent: { type: String },
    at: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

auditLogSchema.index({ entity: 1, entityId: 1, at: -1 });

auditLogSchema.index({ at: -1 });

export const AuditLogModel = model('AuditLog', auditLogSchema);
