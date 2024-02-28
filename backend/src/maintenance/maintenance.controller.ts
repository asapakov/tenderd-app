import mongoose from 'mongoose';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MaintenancesService } from './maintenance.service';
import { Maintenance } from './maintenance.model';
import { MaintenanceDto } from './dto/maintenance.dto';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { NotFoundMaintenanceDto } from './dto/not-found-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { NotFoundVehicleDto } from '../vehicles/dto/not-found-vehicle.dto';
import { MaintenanceByVehicleDto } from './dto/maintenance-by-vehicle.dto';

@ApiTags('Maintenance Controller')
@Controller('maintenance')
export class MaintenancesController {
  constructor(private readonly maintenancesService: MaintenancesService) {}

  @ApiOperation({ summary: 'Create new maintenance' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Created maintenance',
    type: MaintenanceDto,
  })
  @Post()
  create(@Body() maintenance: CreateMaintenanceDto): Promise<Maintenance> {
    return this.maintenancesService.createMaintenance(maintenance);
  }

  @ApiOperation({ summary: 'Get all maintenance' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Maintenance array',
    type: MaintenanceDto,
  })
  @Get()
  findAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<Maintenance[]> {
    return this.maintenancesService.findAllMaintenances(limit, offset);
  }

  @ApiOperation({ summary: 'Get maintenance by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Maintenance information',
    type: MaintenanceDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Maintenance with id not found',
    type: NotFoundMaintenanceDto,
  })
  @Get(':id')
  findOne(@Param('maintenanceId') maintenanceId: string): Promise<Maintenance> {
    if (!mongoose.Types.ObjectId.isValid(maintenanceId)) {
      throw new BadRequestException('Provided vehicle id is wrong');
    }
    return this.maintenancesService.findMaintenanceById(maintenanceId);
  }

  @ApiOperation({ summary: 'Get all maintenance by vehicle id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Maintenance information',
    type: MaintenanceByVehicleDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vehicle with id not found',
    type: NotFoundVehicleDto,
  })
  @Get('/vehicle/:vehicleId')
  findAllByVehicleId(
    @Param('vehicleId') vehicleId: string,
  ): Promise<MaintenanceByVehicleDto> {
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      throw new BadRequestException('Provided vehicle id is wrong');
    }
    return this.maintenancesService.findAllByVehicleId(vehicleId);
  }

  @ApiOperation({ summary: 'Update maintenance by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Maintenance information',
    type: MaintenanceDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Maintenance with id not found',
    type: NotFoundMaintenanceDto,
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedMaintenance: UpdateMaintenanceDto,
  ): Promise<Maintenance> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Provided maintenance id is wrong');
    }
    return this.maintenancesService.updateMaintenance(id, updatedMaintenance);
  }

  @ApiOperation({ summary: 'Delete maintenance by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted maintenance information',
    type: MaintenanceDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Maintenance with id not found',
    type: NotFoundMaintenanceDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Maintenance> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Provided maintenance id is wrong');
    }
    return this.maintenancesService.deleteMaintenance(id);
  }
}
