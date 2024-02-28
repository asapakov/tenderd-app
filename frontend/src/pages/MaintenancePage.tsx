import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMaintenance } from '../service/axios';
import { type IMaintenance } from '../interface';
import List from '../components/List';
import Spinner from '../components/Spinner';

const MaintenancePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [maintenance, setMaintenance] = useState<IMaintenance[]>([]);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetchMaintenance(id);
        if (response?.data) {
          setMaintenance(response.data.maintenance);
        }
      } catch (error) {
        console.error('Cannot fetch maintenance:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Spinner />;
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={() => window.history.back()}
      >
        Back
      </button>
      <List items={maintenance} slug={'Maintenance'} />
    </div>
  );
};

export default MaintenancePage;
