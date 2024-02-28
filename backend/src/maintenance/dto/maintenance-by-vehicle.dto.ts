import { Maintenance } from '../maintenance.model';
import { ApiProperty } from '@nestjs/swagger';

const exampleMaintenanceData: any = [
  {
    _id: '65d78a852bbcd05dab3b819a',
    vehicleId: '65d783c6116d9af048d3256f',
    description: 'some descr',
    startDate: '2024-02-22T18:39:39.938Z',
    endDate: '2024-02-24T18:39:09.669Z',
  },
  {
    _id: '65d794ebdf69b8d157419c68',
    vehicleId: '65d783c6116d9af048d3256f',
    description: 'The undercarriage was broken',
    startDate: '2024-02-22T18:39:39.938Z',
    endDate: '2024-02-24T18:39:09.669Z',
  },
];

export class MaintenanceByVehicleDto {
  constructor(vehicleId: string, maintenanceArray: Maintenance[]) {
    this.vehicleId = vehicleId;
    this.maintenance = maintenanceArray;
  }

  @ApiProperty({
    example: '65d783c6116d9af048d3256f',
    description: 'Id of the vehicle under maintenance',
    nullable: false,
  })
  vehicleId: string;

  @ApiProperty({
    example: exampleMaintenanceData,
    description: 'Array of maintenance',
    nullable: false,
  })
  maintenance: Maintenance[];
}
