import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  // health check for successfully deployment
  @ApiExcludeEndpoint(true)
  @Get('/health')
  healthCheck() {
    return { status: 'healthy' };
  }
}
