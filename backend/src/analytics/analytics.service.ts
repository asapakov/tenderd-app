import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analytic } from './analytics.model';
import { AnalyticDto } from './dto/analytic.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel('Analytic')
    private readonly analyticModel: Model<Analytic>,
  ) {}

  async getVehicleAnalytic(vehicleId: string): Promise<AnalyticDto> {
    const analytic: AnalyticDto = (await this.analyticModel.findOne({
      vehicleId,
    })) as AnalyticDto;
    if (!analytic) {
      throw new NotFoundException(`Vehicle with id ${vehicleId} not found`);
    }
    return analytic;
  }

  getAll(): Promise<Analytic[]> {
    return this.analyticModel.find().populate('vehicleId').exec();
  }
}
