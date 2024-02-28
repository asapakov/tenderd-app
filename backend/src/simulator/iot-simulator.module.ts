import { Module, OnModuleInit } from '@nestjs/common';
import { IotSimulatorService } from './iot-simulator.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { ServiceConfigModule } from '../service/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ServiceConfigModule, HttpModule],
  providers: [IotSimulatorService],
})
export class IotSimulatorModule implements OnModuleInit {
  private readonly iotDataInterval: number;
  private readonly maintenanceInterval: number;

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly simulatorService: IotSimulatorService,
    private readonly configService: ConfigService,
  ) {
    // Get interval value from config
    this.iotDataInterval = this.configService.get<number>(
      'simulator.interval.iotData',
    );
    this.maintenanceInterval = this.configService.get<number>(
      'simulator.interval.maintenance',
    );
  }
  onModuleInit(): any {
    // Simulator process
    // If SIMULATOR_ENABLED variable not equal true, simulator won't run
    if (this.configService.get<string>('simulator.enabled') !== 'true') {
      return;
    }
    // Get actual vehicles list
    setTimeout(() => {
      return this.simulatorService.getActualVehiclesList();
    }, 1000);

    // Set up an interval to call the simulateIoTData method every 10 seconds
    const iot_job = setInterval(() => {
      return this.simulatorService.simulateIoTData();
    }, this.iotDataInterval);

    // Set up an interval to call the simulateVehicleMaintenance method every 10 seconds
    const maintenance_job = setInterval(() => {
      this.simulatorService.simulateVehicleMaintenance();
    }, this.maintenanceInterval);

    // Register the interval to be able to clear it later if needed
    this.schedulerRegistry.addInterval('iot-simulator', iot_job);
    this.schedulerRegistry.addInterval(
      'maintenance-simulator',
      maintenance_job,
    );
  }
}
