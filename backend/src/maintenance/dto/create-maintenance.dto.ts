import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';
import { IsFutureDate } from '../../service/validator/future-date.validator';
import { IsStartDateBeforeEndDate } from '../../service/validator/start-end-date.validator';

export class CreateMaintenanceDto {
  @IsNotEmpty({ message: 'VehicleId must be provided' })
  @ApiProperty({
    example: '65d783c6116d9af048d3256f',
    description: 'Id of the vehicle under maintenance',
    nullable: false,
  })
  vehicleId: string;

  @IsNotEmpty({ message: 'Description must be provided' })
  @ApiProperty({
    example: 'The undercarriage was broken',
    description: 'Maintenance source',
    nullable: false,
  })
  description: string;

  @IsNotEmpty({ message: 'Start date must be provided' })
  @ApiProperty({
    example: new Date(),
    description: 'Planned date of vehicle maintenance',
    nullable: false,
  })
  @IsDateString()
  @IsStartDateBeforeEndDate({ message: 'Start date must be before end date' }) // Apply custom validator
  startDate: Date;

  @IsNotEmpty({ message: 'End date must be provided' })
  @ApiProperty({
    example: new Date(),
    description: 'End date of vehicle maintenance',
    nullable: false,
  })
  @IsDateString()
  @IsFutureDate()
  endDate: Date;
}
