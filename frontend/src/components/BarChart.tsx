import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { type IAnalytics } from '../interface';

const BarChart = ({ dataFromQuery }: any) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  );
  const optionsSpeed = {
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: 'Total average speed vehicles',
      },
    },
  };
  const optionsDistance = {
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: 'Total average vehicles distance',
      },
    },
  };

  const labels = dataFromQuery.map((analytic: any) =>
    `${analytic?.vehicleId?.modelType} ${analytic?.vehicleId?.plateNumber}`.toUpperCase(),
  );

  const dataSpeed = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Average speed',
        data: dataFromQuery.map((d: any) => d?.averageSpeed),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const dataDistance = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Total distance',
        data: dataFromQuery.map((d: IAnalytics) => d?.totalDistance),
        borderColor: 'white',
        backgroundColor: '#272c46',
      },
    ],
  };
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Line
        className="mx-5"
        height={window.innerWidth < 1200 ? '300px' : '70%'}
        options={optionsSpeed}
        data={dataSpeed}
      />
      <Line
        className="mx-5"
        height={window.innerWidth < 1200 ? '300px' : '70%'}
        options={optionsDistance}
        data={dataDistance}
      />
    </div>
  );
};

const BarChartMemoized = ({ data: analytics }: any) =>
  useMemo(() => {
    return <BarChart dataFromQuery={analytics} />;
  }, [analytics]);

export default BarChartMemoized;
