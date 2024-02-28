import { Module } from '@nestjs/common';
import { VehicleDataSchema } from './vehicle-data.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleDataController } from './vehicle-data.controller';
import { VehicleDataService } from './vehicle-data.service';
import { VehicleSchema } from '../../vehicles/vehicle.schema';
import { AnalyticsSchema } from '../../analytics/analytics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'VehicleData', schema: VehicleDataSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
    MongooseModule.forFeature([{ name: 'Analytic', schema: AnalyticsSchema }]),
  ],
  controllers: [VehicleDataController],
  providers: [VehicleDataService],
  exports: [VehicleDataService],
})
export class VehicleDataModule {}
