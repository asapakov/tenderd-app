import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MOCK_VEHICLES } from './common/mock-data';
import { Vehicle } from './vehicle.model';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ConfigService } from '@nestjs/config';
import { Analytic } from '../analytics/analytics.model';

@Injectable()
export class VehiclesService implements OnModuleInit {
  private readonly seedersEnabled: boolean;
  constructor(
    @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
    @InjectModel('Analytic') private readonly analyticModel: Model<Analytic>,
    private readonly configService: ConfigService,
  ) {
    this.seedersEnabled =
      configService.get<string>('database.mongo.seeders.enabled') === 'true';
  }

  async createVehicle(vehicle: CreateVehicleDto): Promise<Vehicle> {
    // check if vehicle exists by plate number. If not, create
    const existingVehicle = await this.findVehicleByPlateNumber(
      vehicle.plateNumber,
    );
    if (existingVehicle) return existingVehicle;
    const newVehicle = new this.vehicleModel(vehicle);
    const newAnalytic = new this.analyticModel({ vehicleId: newVehicle._id });
    await newAnalytic.save();
    return newVehicle.save();
  }

  async findAllVehicles(limit: number, offset: number): Promise<Vehicle[]> {
    return this.vehicleModel.find().skip(offset).limit(limit).exec();
  }

  async findVehicleById(id: string): Promise<Vehicle> {
    const existingVehicle = await this.vehicleModel.findById(id);
    if (!existingVehicle)
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    return existingVehicle;
  }

  findVehicleByPlateNumber(plateNumber: string): Promise<Vehicle> {
    return this.vehicleModel.findOne({ plateNumber }).exec();
  }

  async updateVehicle(
    id: string,
    updatedVehicle: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const existingVehicle = await this.findVehicleById(id);
    if (!existingVehicle)
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    return this.vehicleModel.findByIdAndUpdate(id, updatedVehicle, {
      new: true,
    });
  }

  async deleteVehicle(id: string): Promise<Vehicle> {
    const existingVehicle = await this.findVehicleById(id);
    if (!existingVehicle)
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    return this.vehicleModel.findByIdAndDelete(id);
  }

  async onModuleInit(): Promise<any> {
    const vehicles = await this.vehicleModel.find().exec();
    if (!vehicles || !vehicles.length) {
      // If SEEDERS_ENABLED variable equal true, it will add mock data to mongo database
      if (this.seedersEnabled) {
        const promises = [];
        for (const mock of MOCK_VEHICLES) {
          promises.push(this.createVehicle(mock));
        }
        return Promise.all(promises);
      }
    }
  }
}
