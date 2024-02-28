import * as mongoose from 'mongoose';
import { MaintenanceSchema } from './maintenance.schema';

export interface Maintenance extends mongoose.Document {
  vehicleId: mongoose.Schema.Types.ObjectId;
  description: string;
  startDate: Date;
  endDate: Date;
  date: Date;
}

export const MaintenanceModel = mongoose.model<Maintenance>(
  'Maintenance',
  MaintenanceSchema,
);
