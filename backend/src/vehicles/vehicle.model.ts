import * as mongoose from 'mongoose';
import { VehicleSchema } from './vehicle.schema';

export interface Vehicle extends mongoose.Document {
  modelType: string;
  type: string;
  status: string;
  plateNumber: string;
  createdAt: Date;
}

export const VehicleModel = mongoose.model<Vehicle>('Vehicle', VehicleSchema);
