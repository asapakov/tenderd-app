import * as mongoose from 'mongoose';
import { VehicleStatusEnum } from './common/enum';
import { AnalyticsModel } from '../analytics/analytics.model';

export const VehicleSchema = new mongoose.Schema(
  {
    modelType: { type: String, required: true },
    type: { type: String, required: true },
    status: {
      type: String,
      enum: VehicleStatusEnum,
      default: VehicleStatusEnum.active,
    },
    plateNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

VehicleSchema.pre('save', function (next) {
  if (this.modelType) {
    this.modelType = this.modelType.toLowerCase();
  }
  if (this.type) {
    this.type = this.type.toLowerCase();
  }
  if (this.plateNumber) {
    this.plateNumber = this.plateNumber.toLowerCase();
  }
  next();
});
