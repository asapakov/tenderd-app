import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class vehicleDataDto {
  @ApiProperty({
    example: '65d78a852bbcd05dab3b819a',
    description: 'Unique id in database',
    nullable: false,
  })
  _id: string;

  @ApiProperty({
    example: '65d783c6116d9af048d3256f',
    description: 'Id of the device send data',
    nullable: false,
  })
  deviceId: string;

  @ApiProperty({
    example: '65d783c6116d9af048d3256f',
    description: 'Id of the vehicle',
    nullable: false,
  })
  vehicleId: string;

  @ApiProperty({
    example: 100,
    description: 'vehicle data speed',
    nullable: false,
  })
  speed: mongoose.Schema.Types.Decimal128;

  @ApiProperty({
    example: 45.6789,
    description: 'Vehicle current location longitude',
    nullable: false,
  })
  longitude: mongoose.Schema.Types.Decimal128;

  @ApiProperty({
    example: 78.1234,
    description: 'Vehicle current location latitude',
    nullable: false,
  })
  latitude: mongoose.Schema.Types.Decimal128;

  @ApiProperty({
    example: 24.14,
    description: 'Vehicle current distance',
    nullable: false,
  })
  distance: mongoose.Schema.Types.Decimal128;

  @ApiProperty({
    example: new Date(),
    description: 'Date of vehicle data creating',
    nullable: false,
  })
  timestamp: Date;
}
