import axios from 'axios';
import { type IVehicle } from '../../interface';

const BACKEND_URL = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api`;
console.log(
  process.env.REACT_APP_BACKEND_PORT,
  'process.env.REACT_APP_BACKEND_PORT',
);
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export const fetchVehicles = () => {
  return axiosInstance
    .get('/vehicles')
    .then((response) => response)
    .catch((error) => error);
};

export const createVehicle = (vehicle: Partial<IVehicle>) => {
  return axiosInstance
    .post(`/vehicles/`, vehicle)
    .then((response) => response)
    .catch((error) => error);
};

export const deleteVehicle = (_id: string) => {
  return axiosInstance
    .delete(`/vehicles/${_id}`)
    .then((response) => response)
    .catch((error) => error);
};

export const fetchMaintenance = (id: string) => {
  return axiosInstance
    .get(`/maintenance/vehicle/${id}`)
    .then((response) => response)
    .catch((error) => error);
};

export const fetchAnalytics = () => {
  return axiosInstance
    .get('analytics')
    .then((response) => response)
    .catch((error) => error);
};
