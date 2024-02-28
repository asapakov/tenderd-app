import * as mongoose from 'mongoose';
import { AnalyticsSchema } from './analytics.schema';

export interface Analytic extends mongoose.Document {
  vehicleId: mongoose.Schema.Types.ObjectId;
  totalDistance: mongoose.Schema.Types.Decimal128;
  averageSpeed: mongoose.Schema.Types.Decimal128;
}

export const AnalyticsModel = mongoose.model<Analytic>(
  'Analytic',
    AnalyticsSchema,
);
