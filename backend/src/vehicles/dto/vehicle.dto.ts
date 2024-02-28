import { ApiProperty } from '@nestjs/swagger';
import { VehicleStatusEnum } from '../common/enum';

export class VehicleDto {
  @ApiProperty({
    example: '65d78a852bbcd05dab3b819a',
    description: 'Unique id in database',
    nullable: false,
  })
  _id: string;

  @ApiProperty({
    example: 'toyota',
    description: 'Success status',
    nullable: false,
  })
  modelType: string;

  @ApiProperty({
    example: 'sedan',
    description: 'Vehicle type',
    nullable: false,
  })
  type: string;

  @ApiProperty({
    example: VehicleStatusEnum.active,
    description: 'Vehicle current status',
    nullable: false,
  })
  status: string;

  @ApiProperty({
    example: 'A7777',
    description: 'Vehicle plate number',
    nullable: false,
  })
  plateNumber: string;

  @ApiProperty({
    example: new Date(),
    description: 'Date of vehicle creating',
    nullable: false,
  })
  createdAt: Date;
}
