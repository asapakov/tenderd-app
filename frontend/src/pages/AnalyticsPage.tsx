import React, { useEffect, useMemo, useState } from 'react';
import { fetchAnalytics } from '../service/axios';
import { arraysAreEqual } from '../service/helpers';
import { type IAnalytics } from '../interface';
import Spinner from '../components/Spinner';
import BarChartMemoized from '../components/BarChart';

const AnalyticsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<IAnalytics[]>([]);
  const [isAutoRefreshing, setIsAutoRefreshing] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchAnalytics();
      if (response?.data) {
        if (!arraysAreEqual(analytics, response.data)) {
          setAnalytics(response.data);
        }
      }
    } catch (error) {
      console.error('Cannot fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };
  const changeAutoRefreshStatus = (status: boolean) => {
    // saving state into localStorage
    localStorage.setItem('auto_refresh', String(status));
    setIsAutoRefreshing(status);
  };

  useEffect(() => {
    // getting state from localStorage
    const autoRefresh = localStorage.getItem('auto_refresh');
    if (autoRefresh) {
      setIsAutoRefreshing(autoRefresh === 'true');
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (isAutoRefreshing) {
      const intervalId = setInterval(fetchData, 5000); // Refresh every 5 seconds
      return () => clearInterval(intervalId);
    }
  }, [isAutoRefreshing]);

  const totalAverageSpeed = useMemo(() => {
    return (
      analytics.reduce((prev, curr) => prev + curr.averageSpeed, 0) /
      analytics.length
    ).toFixed(2);
  }, [analytics]);
  const totalAverageDistance = useMemo(() => {
    return (
      analytics.reduce((prev, curr) => prev + curr.totalDistance, 0) /
      analytics.length
    ).toFixed(2);
  }, [analytics]);

  return loading ? (
    <Spinner />
  ) : analytics.length ? (
    <div className="d-block">
      <div className="d-flex justify-content-between mb-5">
        <h3>Analytics page</h3>
        <button
          type="button"
          onClick={() => changeAutoRefreshStatus(!isAutoRefreshing)}
          className={isAutoRefreshing ? 'btn btn-success' : 'btn btn-danger'}
        >
          Auto refresh {isAutoRefreshing ? 'enabled' : 'disabled'}
        </button>
      </div>
      <div className="d-flex justify-content-around">
        <p>
          Analytics based on the data of <b>{analytics.length}</b> vehicles
        </p>
        <p>
          Total average speed: <b>{totalAverageSpeed}</b> km/h
        </p>
        <p>
          Total average distance: <b>{totalAverageDistance}</b> km
        </p>
      </div>
      <BarChartMemoized data={analytics} />
    </div>
  ) : (
    <h5>No analytics data</h5>
  );
};

export default AnalyticsPage;
