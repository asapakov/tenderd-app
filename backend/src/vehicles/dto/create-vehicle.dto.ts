import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { VehicleStatusEnum } from '../common/enum';

export class CreateVehicleDto {
  @IsNotEmpty({ message: 'Vehicle model must be provided' })
  @ApiProperty({
    example: 'toyota',
    description: 'model type',
    nullable: false,
  })
  modelType: string;

  @IsNotEmpty({ message: 'Vehicle type must be provided' })
  @ApiProperty({
    example: 'sedan',
    description: 'vehicle type',
    nullable: false,
  })
  type: string;

  @IsNotEmpty({ message: 'Vehicle plate number must be provided' })
  @ApiProperty({
    example: 'A7777',
    description: 'vehicle plate number',
    nullable: false,
  })
  plateNumber: string;

  @IsNotEmpty({ message: 'Vehicle status must be provided' })
  @ApiProperty({
    example: VehicleStatusEnum.active,
    description: 'vehicle status',
    nullable: false,
  })
  @IsEnum(VehicleStatusEnum)
  status: string;
}
