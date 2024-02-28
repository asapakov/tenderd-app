import { ApiProperty } from '@nestjs/swagger';

export class MaintenanceDto {
  @ApiProperty({
    example: '65d78a852bbcd05dab3b819a',
    description: 'Unique id in database',
    nullable: false,
  })
  _id: string;

  @ApiProperty({
    example: '65d783c6116d9af048d3256f',
    description: 'Id of the vehicle under maintenance',
    nullable: false,
  })
  vehicleId: string;

  @ApiProperty({
    example: 'The undercarriage was broken',
    description: 'Maintenance source',
    nullable: false,
  })
  description: string;

  @ApiProperty({
    example: new Date(),
    description: 'Planned date of vehicle maintenance',
    nullable: false,
  })
  startDate: Date;

  @ApiProperty({
    example: new Date(),
    description: 'End date of vehicle maintenance',
    nullable: false,
  })
  endDate: string;

  @ApiProperty({
    example: new Date(),
    description: 'Date of vehicle maintenance start',
    nullable: false,
  })
  createdAt: Date;
}
