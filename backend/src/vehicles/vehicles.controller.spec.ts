import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { VehicleDto } from './dto/vehicle.dto';
import mongoose from 'mongoose';

// Mock data for testing
const mockVehicle: VehicleDto = {
  _id: '65ddfe01e7097245979a1346',
  modelType: 'Camry',
  type: 'sedan',
  status: 'active',
  plateNumber: 'ABC123',
  createdAt: new Date(),
};

const mockCreateVehicleDto: CreateVehicleDto = {
  modelType: 'Camry',
  type: 'sedan',
  plateNumber: 'ABC123',
  status: 'active',
};

const mockUpdateVehicleDto: UpdateVehicleDto = {
  modelType: 'Honda',
};

// Mock VehicleModel
const mockVehicleModel = {
  create: jest.fn().mockResolvedValue(mockVehicle),
  find: jest.fn().mockReturnValueOnce({
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValueOnce([mockVehicle]),
  }),
  findById: jest.fn().mockResolvedValue(mockVehicle),
  findOne: jest.fn().mockReturnValueOnce({
    exec: jest.fn().mockResolvedValueOnce(mockVehicle),
  }),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockVehicle),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockVehicle),
};

// Mock AnalyticModel
const mockAnalyticModel = {
  save: jest.fn(),
};

describe('VehiclesController', () => {
  let controller: VehiclesController;
  let service: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        VehiclesService,
        {
          provide: getModelToken('Vehicle'),
          useValue: mockVehicleModel,
        },
        {
          provide: getModelToken('Analytic'),
          useValue: mockAnalyticModel,
        },
        ConfigService, // You may need to provide a mocked ConfigService if it's used in your service
      ],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a vehicle', async () => {
      const result = await controller.create(mockCreateVehicleDto);
      expect(result).toEqual(mockVehicle);
    });
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const result = await controller.findAll(10, 0);
      expect(result).toEqual([mockVehicle]);
    });
  });

  describe('findOne', () => {
    it('should return a vehicle by ID', async () => {
      const result = await controller.findOne('65ddfe01e7097245979a1346');
      expect(result).toEqual(mockVehicle);
    });

    it('should throw BadRequestException if invalid ID provided', async () => {
      const mockId = 'invalid_id';
      // Mocking mongoose.Types.ObjectId.isValid to return false for invalid id
      jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValueOnce(false);
      expect(() => controller.findOne(mockId)).toThrowError(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update a vehicle by ID', async () => {
      const result = await controller.update(
        '65ddfe01e7097245979a1346',
        mockUpdateVehicleDto,
      );
      expect(result).toEqual(mockVehicle);
    });

    it('should throw BadRequestException if invalid ID provided', async () => {
      jest.spyOn(service, 'updateVehicle').mockResolvedValueOnce(undefined);
      expect(() => controller.findOne('invalid-id')).toThrowError(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a vehicle by ID', async () => {
      const result = await controller.remove('65ddfe01e7097245979a1346');
      expect(result).toEqual(mockVehicle);
    });

    it('should throw NotFoundException if vehicle not found', async () => {
      jest.spyOn(service, 'findVehicleById').mockResolvedValueOnce(undefined);
      await expect(
        controller.remove('65ddfe01e7097245979a1346'),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw BadRequestException if invalid ID provided', async () => {
      jest.spyOn(service, 'deleteVehicle').mockResolvedValueOnce(undefined);
      expect(() => controller.findOne('invalid-id')).toThrowError(
        BadRequestException,
      );
    });
  });
});
