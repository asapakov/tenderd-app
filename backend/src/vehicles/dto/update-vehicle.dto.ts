import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleStatusEnum } from '../common/enum';

export class UpdateVehicleDto {
  @IsOptional()
  @ApiProperty({
    example: 'toyota',
    description: 'model type',
    nullable: true,
  })
  modelType?: string;

  @IsOptional()
  @ApiProperty({
    example: 'sedan',
    description: 'vehicle type',
    nullable: true,
  })
  type?: string;

  @IsOptional()
  @ApiProperty({
    example: VehicleStatusEnum.active,
    description: 'vehicle status',
    nullable: true,
  })
  status?: string;
}
