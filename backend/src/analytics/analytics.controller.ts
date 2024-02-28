import {
  Controller,
  Get,
  Param,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import mongoose from 'mongoose';
import { NotFoundVehicleDto } from '../vehicles/dto/not-found-vehicle.dto';
import { AnalyticDto } from './dto/analytic.dto';
import { Analytic } from './analytics.model';
import { AnalyticWithVehicleDto } from './dto/analytic-with-vehicle.dto';

@ApiTags('Analytics Controller')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiOperation({ summary: 'Get total analytic data by vehicle id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle data array',
    type: AnalyticDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vehicle with id not found',
    type: NotFoundVehicleDto,
  })
  @Get(':vehicleId/total')
  analyticsByVehicleId(
    @Param('vehicleId') vehicleId: string,
  ): Promise<AnalyticDto> {
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      throw new BadRequestException('Provided vehicle id is wrong');
    }
    return this.analyticsService.getVehicleAnalytic(vehicleId);
  }

  @ApiOperation({ summary: 'Get all existing analytic data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Analytic data array',
    type: [AnalyticWithVehicleDto],
  })
  @Get()
  getAll(): Promise<Analytic[]> {
    return this.analyticsService.getAll();
  }
}
