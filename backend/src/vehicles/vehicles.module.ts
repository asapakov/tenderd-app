import { Module } from '@nestjs/common';
import { VehicleSchema } from './vehicle.schema';
import { AnalyticsSchema } from '../analytics/analytics.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { ServiceConfigModule } from '../service/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
    MongooseModule.forFeature([{ name: 'Analytic', schema: AnalyticsSchema }]),
    ServiceConfigModule,
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
