import { ApiProperty } from '@nestjs/swagger';

export class InactiveVehicleCreateDto {
  @ApiProperty({
    example: 'Vehicle with id 65d77e1576068211bac92846 is not active yet',
    description: 'error message',
    nullable: false,
  })
  message: string;

  @ApiProperty({
    example: 'Bad request',
    description: 'exception',
    nullable: false,
  })
  error: string;

  @ApiProperty({
    example: 400,
    description: 'status code',
    nullable: false,
  })
  statusCode: number;
}
