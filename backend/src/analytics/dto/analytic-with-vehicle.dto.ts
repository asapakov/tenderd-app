import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { VehicleDto } from '../../vehicles/dto/vehicle.dto';

export class AnalyticWithVehicleDto {
  @ApiProperty({
    example: '65d78a852bbcd05dab3b819a',
    description: 'Unique id in database',
    nullable: false,
  })
  _id: string;

  @ApiProperty({
    //example: '65d783c6116d9af048d3256f',
    description: 'Id of the vehicle',
    nullable: false,
  })
  vehicleId: VehicleDto;

  @ApiProperty({
    example: 320.23,
    description: 'vehicles total distance',
    nullable: false,
  })
  totalDistance: mongoose.Schema.Types.Decimal128;

  @ApiProperty({
    example: 55.2,
    description: 'vehicles average speed',
    nullable: false,
  })
  averageSpeed: mongoose.Schema.Types.Decimal128;
}
