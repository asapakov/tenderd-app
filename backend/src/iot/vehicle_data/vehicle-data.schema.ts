import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
const { Decimal128 } = Schema.Types;

export const VehicleDataSchema = new mongoose.Schema(
  {
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    deviceId: { type: String, required: true },
    speed: { type: Decimal128, required: true },
    longitude: { type: Decimal128, required: true },
    latitude: { type: Decimal128, required: true },
    distance: { type: Decimal128, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        ret.speed = parseFloat(ret.speed.toString());
        ret.longitude = parseFloat(ret.longitude.toString());
        ret.latitude = parseFloat(ret.latitude.toString());
        ret.distance = parseFloat(ret.distance.toString());
        return ret;
      },
    },
  },
);
