import { Test, TestingModule } from '@nestjs/testing';
import { MaintenancesService } from './maintenance.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Maintenance } from './maintenance.model';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MaintenanceService', () => {
  let service: MaintenancesService;
  let model: Model<Maintenance>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaintenancesService,
        {
          provide: getModelToken('Maintenance'),
          useValue: {
            new: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            exists: jest.fn(),
          },
        },
        {
          provide: getModelToken('Vehicle'),
          useValue: {
            new: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            exists: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MaintenancesService>(MaintenancesService);
    model = module.get<Model<Maintenance>>(getModelToken('Maintenance'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMaintenanceById', () => {
    it('should throw NotFoundException if maintenance with provided id is not found', async () => {
      const mockId = '65ddfe01e7097245979a1349';
      (model.findById as jest.Mock).mockReturnValueOnce(null);

      expect(() => service.findMaintenanceById(mockId)).toThrowError(
        NotFoundException,
      );
    });

    describe('findAllMaintenances', () => {
      it('should find all maintenance records with pagination', async () => {
        const limit = 10;
        const offset = 0;
        const mockMaintenances = []; // Mock maintenance array
        (model.find as jest.Mock).mockReturnValueOnce({
          skip: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          exec: jest.fn().mockResolvedValueOnce(mockMaintenances),
        });

        const result = await service.findAllMaintenances(limit, offset);

        expect(result).toBe(mockMaintenances);
      });
    });

    // Add more test cases for other methods as needed
  });
});
