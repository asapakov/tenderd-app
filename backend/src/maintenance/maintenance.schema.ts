import * as mongoose from 'mongoose';

export const MaintenanceSchema = new mongoose.Schema(
  {
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    date: { type: Date, default: Date.now },
  },
  { versionKey: false },
);
