import { ApiProperty } from '@nestjs/swagger';

export class NotFoundMaintenanceDto {
  @ApiProperty({
    example: 'Maintenance with id 65d77e1576068211bac92846 not found',
    description: 'error message',
    nullable: false,
  })
  message: string;

  @ApiProperty({
    example: 'Not found',
    description: 'exception',
    nullable: false,
  })
  error: string;

  @ApiProperty({
    example: 404,
    description: 'status code',
    nullable: false,
  })
  statusCode: number;
}
