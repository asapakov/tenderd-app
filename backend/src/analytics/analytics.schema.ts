import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
const { Decimal128 } = Schema.Types;

export const AnalyticsSchema = new mongoose.Schema(
  {
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    totalDistance: { type: Decimal128, required: true, default: 0 },
    averageSpeed: { type: Decimal128, required: true, default: 0 },
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        ret.averageSpeed = parseFloat(ret.averageSpeed.toString());
        ret.totalDistance = parseFloat(ret.totalDistance.toString());
        return ret;
      },
    },
  },
);
/*AnalyticsSchema.pre('findOne', (doc) => {

})*/
