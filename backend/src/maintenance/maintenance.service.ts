import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Maintenance } from './maintenance.model';
import { Vehicle } from '../vehicles/vehicle.model';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { MaintenanceByVehicleDto } from './dto/maintenance-by-vehicle.dto';
import { VehicleStatusEnum } from '../vehicles/common/enum';

@Injectable()
export class MaintenancesService {
  constructor(
    @InjectModel('Maintenance')
    private readonly maintenanceModel: Model<Maintenance>,
    @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
  ) {}

  //@Cron('0 0 * * *') // Every midnight
  @Cron('*/5 * * * * *') // FIX
  // The cron job runs once a day and checks for active maintenance by vehicle ID.
  // If not, changes the status of the vehicle to active
  async updateCarStatuses(): Promise<any> {
    const today = new Date();
    const promises = [];
    try {
      const vehicles = await this.vehicleModel.find();
      for (const vehicle of vehicles) {
        const activeMaintenance = await this.maintenanceModel
          .findOne({
            startDate: { $lt: today }, // startDate is less than today
            endDate: { $gt: today }, // endDate is greater than today
            vehicleId: vehicle.id,
          })
          .exec();
        promises.push(
          this.vehicleModel.findByIdAndUpdate(vehicle.id, {
            status: activeMaintenance
              ? VehicleStatusEnum.maintenance
              : VehicleStatusEnum.active,
          }),
        );
      }
      return Promise.all(promises);
    } catch (error) {
      console.error('Error updating car statuses:', error);
    }
  }

  createMaintenance(maintenance: CreateMaintenanceDto): Promise<Maintenance> {
    const newMaintenance = new this.maintenanceModel(maintenance);
    return newMaintenance.save();
  }

  findAllMaintenances(limit: number, offset: number): Promise<Maintenance[]> {
    return this.maintenanceModel.find().skip(offset).limit(limit).exec();
  }

  findMaintenanceById(id: string): Promise<Maintenance> {
    const existingMaintenance = this.maintenanceModel.findById(id);
    if (!existingMaintenance)
      throw new NotFoundException(`Maintenance with id ${id} not found`);
    return this.maintenanceModel.findById(id).exec();
  }

  async findAllByVehicleId(
    vehicleId: string,
  ): Promise<MaintenanceByVehicleDto> {
    // get all maintenance by vehicle id
    const maintenanceArray = await this.maintenanceModel
      .find({ vehicleId })
      .exec();
    if (!maintenanceArray.length) {
      // if no maintenance found, then check if vehicle exists
      const vehicleExists = await this.vehicleModel.exists({ _id: vehicleId });
      if (!vehicleExists) {
        throw new NotFoundException(`Vehicle with ID ${vehicleId} not found`);
      }
    }
    // if vehicle exists, return maintenance array or []
    return new MaintenanceByVehicleDto(
      vehicleId,
      maintenanceArray as Maintenance[],
    );
  }

  async updateMaintenance(
    id: string,
    updatedMaintenance: UpdateMaintenanceDto,
  ): Promise<Maintenance> {
    const existingMaintenance = await this.findMaintenanceById(id);
    if (!existingMaintenance)
      throw new NotFoundException(`Maintenance with id ${id} not found`);
    return this.maintenanceModel
      .findByIdAndUpdate(id, updatedMaintenance, { new: true });
  }

  async deleteMaintenance(id: string): Promise<Maintenance> {
    const existingMaintenance = await this.findMaintenanceById(id);
    if (!existingMaintenance)
      throw new NotFoundException(`Maintenance with id ${id} not found`);
    return this.maintenanceModel.findByIdAndDelete(id);
  }
}
