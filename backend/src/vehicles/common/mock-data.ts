import { CreateVehicleDto } from '../dto/create-vehicle.dto';

export const MOCK_VEHICLES: CreateVehicleDto[] = [
  {
    modelType: 'bmw',
    type: 'sedan',
    status: 'active',
    plateNumber: 'a7777',
  },
  {
    modelType: 'toyota',
    type: 'sedan',
    status: 'active',
    plateNumber: 'a7779',
  },
  {
    modelType: 'lexus',
    type: 'sedan',
    status: 'active',
    plateNumber: 'b5555',
  },
  {
    modelType: 'mercedes',
    type: 'SUV',
    status: 'active',
    plateNumber: 'c4444',
  },
  {
    modelType: 'lamborghini',
    type: 'coupe',
    status: 'active',
    plateNumber: 'h3234',
  },
  {
    modelType: 'tesla',
    type: 'sedan',
    status: 'active',
    plateNumber: 'g4325',
  },
  {
    modelType: 'porsche',
    type: 'coupe',
    status: 'active',
    plateNumber: 'e1234',
  },
];
