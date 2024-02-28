import { VehicleData } from '../vehicle-data.model';
import { ApiProperty } from '@nestjs/swagger';

export class VehicleDataByVehicleIdDto {
  constructor(vehicleId: string, vehicleData: VehicleData[]) {
    this.vehicleId = vehicleId;
    this.vehicleData = vehicleData;
  }
  @ApiProperty({
    example: '65d783c6116d9af048d3256f',
    description: 'Id of the vehicle under maintenance',
    nullable: false,
  })
  vehicleId: string;

  @ApiProperty({
    example: 'FIX',
    description: 'Array of vehicle data',
    nullable: false,
  })
  vehicleData: VehicleData[];
}
