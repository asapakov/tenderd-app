import React, { useCallback, useEffect, useState } from 'react';
import { type IVehicle } from '../interface';
import { createVehicle, deleteVehicle, fetchVehicles } from '../service/axios';
import List from '../components/List';
import Spinner from '../components/Spinner';
import { getSortedObject } from '../service/helpers';

const HomePage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchVehicles();
      if (response?.data) {
        setVehicles(
          response.data.map((item: IVehicle) => getSortedObject(item)),
        );
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const remove = useCallback((_id: string, vehiclesList: IVehicle[]) => {
    const removeVehicle = async (id: string) => {
      try {
        setIsLoading(true);
        const response = await deleteVehicle(id);
        if (response.status === 200) {
          const sortedList = vehiclesList.filter(
            (vehicle: IVehicle) => vehicle._id !== response.data._id,
          );
          setVehicles(sortedList);
        }
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      } finally {
        setIsLoading(false);
      }
    };
    removeVehicle(_id);
  }, []);
  const create = useCallback((form: any, items: IVehicle[]) => {
    const addVehicle = async () => {
      try {
        const response = await createVehicle({ ...form, status: 'active' });
        if (response?.data) {
          setVehicles([...items, getSortedObject(response.data) as IVehicle]);
        }
      } catch (error) {
        console.error('Cannot create vehicle:', error);
      }
    };
    addVehicle();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="d-flex justify-content-between mb-5">
        <h3>Welcome, User</h3>
      </div>
      {vehicles.length ? (
        <List
          items={vehicles}
          slug={'Click on vehicle to get detailed info'}
          remove={remove}
          create={create}
        />
      ) : (
        <p>No items</p>
      )}
    </div>
  );
};

export default HomePage;
