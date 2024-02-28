import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenanceSchema } from './maintenance.schema';
import { VehicleSchema } from '../vehicles/vehicle.schema';
import { MaintenancesController } from './maintenance.controller';
import { MaintenancesService } from './maintenance.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Maintenance', schema: MaintenanceSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
  ],
  controllers: [MaintenancesController],
  providers: [MaintenancesService],
})
export class MaintenancesModule {}
