import {
  generateRandomLatitudeUAE,
  generateRandomLongitudeUAE,
} from './helper';
import { Injectable, Logger } from '@nestjs/common';
import { map, Subscription } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Vehicle } from '../vehicles/vehicle.model';

@Injectable()
export class IotSimulatorService {
  logger = new Logger(IotSimulatorService.name);
  private readonly host: string;
  private vehicles: Vehicle[];
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const port = this.configService.get<number>('port');
    this.host = `http://localhost:${port}/api`;
  }

  getActualVehiclesList(): Subscription {
    return this.httpService
      .get(`${this.host}/vehicles`)
      .pipe(map((response: any) => response))
      .subscribe({
        next: (res) => {
          if (res.data) {
            if (res.data.length) {
              this.vehicles = res.data;
            } else {
              this.logger.error('Need to add vehicles');
            }
          }
        },
        error: (err) => {
          console.log(JSON.stringify(err));
        },
      });
  }

  simulateIoTData(): Subscription {
    // Generate mock vehicle IoT data
    if (!this.vehicles?.length) {
      return;
    }
    const randomVehicleIndex = Math.floor(Math.random() * this.vehicles.length);
    const mockData = {
      vehicleId: this.vehicles[randomVehicleIndex]._id,
      deviceId: Math.floor(Math.random() * 100), // Random IoT device id
      speed: Math.floor(Math.random() * 100), // Random speed
      latitude: generateRandomLatitudeUAE(), // Random latitude
      longitude: generateRandomLongitudeUAE(), // Random longitude
      distance: Math.random() * 100, // Random longitude
      timestamp: new Date().toISOString(),
    };

    // Send mock data to API endpoint for vehicle IoT data
    return this.httpService
      .post(`${this.host}/vehicle-iot-data`, mockData)
      .pipe(map((response: any) => response))
      .subscribe({
        next: (res) => {
          if (res.status > 200) {
            console.log('Simulated IoT data sent successfully.');
          }
        },
        error: (err) => {
          console.log(
            'Cannot simulate IoT data: ',
            err?.response?.data?.message,
          );
        },
      });
  }

  simulateVehicleMaintenance(): Subscription {
    // Generate mock maintenance data
    if (!this.vehicles?.length) {
      return;
    }
    const randomVehicleIndex = Math.floor(Math.random() * this.vehicles.length);
    const isoStartDate = new Date().toISOString();
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + 5);
    const isoEndDate = currentDate.toISOString();
    const mockData = {
      vehicleId: this.vehicles[randomVehicleIndex]._id,
      description: 'The undercarriage was broken',
      startDate: isoStartDate,
      endDate: isoEndDate,
    };

    // Send mock data to API endpoint for vehicle maintenance
    return this.httpService
      .post(`${this.host}/maintenance`, mockData)
      .pipe(map((response: any) => response))
      .subscribe({
        next: (res) => {
          if (res.status > 200) {
            console.log('Simulated maintenance sent successfully.');
          }
        },
        error: () => {
          console.log('Error occurred');
        },
      });
  }
}
