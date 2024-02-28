import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import mongoose from 'mongoose';

export class CreateVehicleDataDto {
  @IsNotEmpty({ message: 'VehicleId must be provided' })
  @IsMongoId()
  @ApiProperty({
    example: '65d783c6116d9af048d3256f',
    description: 'Id of the vehicle',
    nullable: false,
  })
  vehicleId: string;

  @IsNotEmpty({ message: 'deviceId must be provided' })
  @ApiProperty({
    example: '65d783c6116d9af048d3256f',
    description: 'Id of the device send data',
    nullable: false,
  })
  deviceId: string;

  @IsNotEmpty({ message: 'Speed must be provided' })
  @IsNumber()
  @ApiProperty({
    example: 100,
    description: 'vehicle data speed',
    nullable: false,
  })
  speed: mongoose.Schema.Types.Decimal128;

  @IsNotEmpty({ message: 'longitude must be provided' })
  @IsNumber()
  @ApiProperty({
    example: 45.6789,
    description: 'Vehicle current location longitude',
    nullable: false,
  })
  longitude: mongoose.Schema.Types.Decimal128;

  @IsNotEmpty({ message: 'Latitude must be provided' })
  @IsNumber()
  @ApiProperty({
    example: 78.1234,
    description: 'Vehicle current location latitude',
    nullable: false,
  })
  latitude: mongoose.Schema.Types.Decimal128;

  @IsNotEmpty({ message: 'Distance must be provided' })
  @IsNumber()
  @ApiProperty({
    example: 24.14,
    description: 'Vehicle current distance',
    nullable: false,
  })
  distance: mongoose.Schema.Types.Decimal128;

  @IsNotEmpty({ message: 'timestamp must be provided' })
  @IsDateString()
  @ApiProperty({
    example: new Date(),
    description: 'Timestamp of vehicle data',
    nullable: false,
  })
  timestamp: Date;
}
