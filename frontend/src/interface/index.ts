export interface IVehicle {
  _id: string;
  modelType: string;
  type: string;
  status: string;
  plateNumber: string;
  createdAt: Date;
}

export interface IMaintenance {
  _id: string;
  vehicleId: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface IAnalytics {
  _id: string;
  vehicleId: string;
  totalDistance: number;
  averageSpeed: number;
}
