import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { ServiceConfigModule } from './service/config';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MongoDbModule } from './service/database/mongo/mongo.module';
import { MaintenancesModule } from './maintenance/maintenance.module';
import { ScheduleModule } from '@nestjs/schedule';
import { VehicleDataModule } from './iot/vehicle_data/vehicle-data.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { WebsocketGateway } from './service/web-socket/web-socket.gateway';
import { IotSimulatorModule } from './simulator/iot-simulator.module';

@Module({
  imports: [
    HttpModule,
    ServiceConfigModule,
    MongoDbModule,
    VehiclesModule,
    MaintenancesModule,
    VehicleDataModule,
    AnalyticsModule,
    IotSimulatorModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [WebsocketGateway],
})
export class AppModule {}
