import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMaintenanceDto {
  @IsOptional()
  @ApiProperty({
    example: '65d783c6116d9af048d3256f',
    description: 'Id of the vehicle under maintenance',
    nullable: false,
  })
  vehicleId: string;

  @IsOptional()
  @ApiProperty({
    example: 'The undercarriage was broken',
    description: 'Maintenance source',
    nullable: false,
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    example: new Date(),
    description: 'Planned date of vehicle maintenance',
    nullable: false,
  })
  startDate: Date;

  @IsOptional()
  @ApiProperty({
    example: new Date(),
    description: 'End date of vehicle maintenance',
    nullable: false,
  })
  endDate: Date;
}
