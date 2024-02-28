import * as mongoose from 'mongoose';
import { VehicleDataSchema } from './vehicle-data.schema';

export interface VehicleData extends mongoose.Document {
  vehicleId: mongoose.Schema.Types.ObjectId;
  deviceId: string;
  speed: mongoose.Schema.Types.Decimal128;
  longitude: mongoose.Schema.Types.Decimal128;
  latitude: mongoose.Schema.Types.Decimal128;
  distance: mongoose.Schema.Types.Decimal128;
  timestamp: Date;
}

export const vehicleDataModel = mongoose.model<VehicleData>('VehicleData', VehicleDataSchema);
