import { Model } from 'mongoose';
import { EventEmitter } from 'events';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVehicleDataDto } from './dto/create-vehicle-data.dto';
import { VehicleDataByVehicleIdDto } from './dto/vehicle-data-by-vehicle-id.dto';
import { VehicleData } from './vehicle-data.model';
import { Vehicle } from '../../vehicles/vehicle.model';
import { VehicleStatusEnum } from '../../vehicles/common/enum';
import { Analytic } from '../../analytics/analytics.model';

@Injectable()
export class VehicleDataService {
  iotDataCreatedEvent = new EventEmitter();

  constructor(
    @InjectModel('VehicleData')
    private readonly vehicleDataModel: Model<VehicleData>,
    @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
    @InjectModel('Analytic')
    private readonly analyticModel: Model<Analytic>,
  ) {}

  async createVehicleIoTData(
    vehicleData: CreateVehicleDataDto,
  ): Promise<VehicleData> {
    const existingVehicle = (await this.vehicleModel.findById(
      vehicleData.vehicleId,
    )) as Vehicle;
    // check if vehicle exists
    if (!existingVehicle)
      throw new NotFoundException(
        `Vehicle with id ${vehicleData.vehicleId} not found`,
      );
    // check if vehicle is active
    if (existingVehicle.status !== VehicleStatusEnum.active) {
      // send alert to develop team, because device sends data about inactive vehicle :D
      throw new BadRequestException(
        `Vehicle with id ${existingVehicle.id} is not active yet`,
      );
    }
    const newVehicleData = new this.vehicleDataModel(vehicleData);

    // add distance to vehicles analytics
    const existingAnalytic = (await this.analyticModel.findOne({
      vehicleId: vehicleData.vehicleId,
    })) as Analytic;
    if (!existingAnalytic) {
      throw new BadRequestException(
        `Vehicle with id ${vehicleData.vehicleId} does not have analytic doc`,
      );
    }
    const newAverageSpeed =
      (+existingAnalytic.averageSpeed + +vehicleData.speed) / 2;
    await this.analyticModel.updateOne(
      { vehicleId: existingVehicle._id },
      {
        $set: { averageSpeed: newAverageSpeed },
        $inc: { totalDistance: vehicleData.distance },
      },
    );
    this.iotDataCreatedEvent.emit('IoT data created', {
      iot: newVehicleData,
      vehicle: existingVehicle,
    });
    return newVehicleData.save();
  }

  async findVehicleDataByVehicleId(
    vehicleId: string,
  ): Promise<VehicleDataByVehicleIdDto> {
    const vehicleDataArray = await this.vehicleDataModel
      .find({ vehicleId })
      .exec();
    if (!vehicleDataArray.length) {
      // if no vehicle data found, then check if vehicle exists
      const vehicleExists = await this.vehicleModel.exists({ _id: vehicleId });
      if (!vehicleExists) {
        throw new NotFoundException(`Vehicle with ID ${vehicleId} not found`);
      }
    }
    // if vehicle exists, return maintenance array or []
    return new VehicleDataByVehicleIdDto(
      vehicleId,
      vehicleDataArray as VehicleData[],
    );
  }
}
