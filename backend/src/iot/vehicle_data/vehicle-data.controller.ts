import mongoose from 'mongoose';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { VehicleData } from './vehicle-data.model';
import { vehicleDataDto } from './dto/vehicle-data.dto';
import { CreateVehicleDataDto } from './dto/create-vehicle-data.dto';
import { VehicleDataService } from './vehicle-data.service';
import { VehicleDataByVehicleIdDto } from './dto/vehicle-data-by-vehicle-id.dto';
import { NotFoundVehicleDto } from '../../vehicles/dto/not-found-vehicle.dto';
import { InactiveVehicleCreateDto } from './dto/inactive-vehicle.dto';

@ApiTags('Vehicle IoT Data Controller')
@Controller('vehicle-iot-data')
export class VehicleDataController {
  constructor(private readonly vehicleDataService: VehicleDataService) {}

  @ApiOperation({ summary: 'Create new vehicle data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Created vehicle IoT data',
    type: vehicleDataDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'If vehicle with id was not found',
    type: NotFoundVehicleDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'If vehicles status is not active',
    type: InactiveVehicleCreateDto,
  })
  @Post()
  create(@Body() vehicleData: CreateVehicleDataDto): Promise<VehicleData> {
    return this.vehicleDataService.createVehicleIoTData(vehicleData);
  }

  @ApiOperation({ summary: 'Get all vehicle IoT data by vehicle id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle data array',
    type: [vehicleDataDto],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vehicle with id not found',
    type: NotFoundVehicleDto,
  })
  @Get(':vehicleId')
  findAllByVehicleId(
    @Param('vehicleId') vehicleId: string,
  ): Promise<VehicleDataByVehicleIdDto> {
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      throw new BadRequestException('Provided vehicle id is wrong');
    }
    return this.vehicleDataService.findVehicleDataByVehicleId(vehicleId);
  }
}
