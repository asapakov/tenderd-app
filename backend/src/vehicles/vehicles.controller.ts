import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicle.model';
import { VehicleDto } from './dto/vehicle.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { NotFoundVehicleDto } from './dto/not-found-vehicle.dto';
import mongoose from 'mongoose';

@ApiTags('Vehicles Controller')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @ApiOperation({ summary: 'Create new vehicle or return existing one' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Created vehicle',
    type: VehicleDto,
  })
  @Post()
  create(@Body() vehicle: CreateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.createVehicle(vehicle);
  }

  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicles array',
    type: [VehicleDto],
  })
  @Get()
  findAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<Vehicle[]> {
    return this.vehiclesService.findAllVehicles(limit, offset);
  }

  @ApiOperation({ summary: 'Get vehicle by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle information',
    type: VehicleDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vehicle with id not found',
    type: NotFoundVehicleDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Vehicle> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Provided vehicle id is wrong');
    }
    return this.vehiclesService.findVehicleById(id);
  }

  @ApiOperation({ summary: 'Update vehicle by id. Cannot change plate number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle information',
    type: VehicleDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vehicle with id not found',
    type: NotFoundVehicleDto,
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedVehicle: UpdateVehicleDto,
  ): Promise<Vehicle> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Provided vehicle id is wrong');
    }
    return this.vehiclesService.updateVehicle(id, updatedVehicle);
  }

  @ApiOperation({ summary: 'Delete vehicle by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted vehicle information',
    type: VehicleDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vehicle with id not found',
    type: NotFoundVehicleDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Vehicle> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Provided vehicle id is wrong');
    }
    return this.vehiclesService.deleteVehicle(id);
  }
}
