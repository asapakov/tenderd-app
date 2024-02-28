import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MapComponent from '../components/Map';
import List from '../components/List';
const socket = io(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}`);

const TrackingPage = () => {
  const [iotData, setIotData] = useState<any[]>([]);
  const [showList, setShowList] = useState<boolean>(false);
  useEffect(() => {
    // Socket.IO event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // socket event named iot_data_created listening
    socket.on('iot_data_created', (data: any) => {
      if (data) {
        // Update the state with new data
        setIotData((prevData) => {
          const index = prevData.findIndex(
            (item: any) => item.iot.vehicleId === data.iot.vehicleId,
          );

          // If the item with the same ID exists, replace it with the new item
          if (index !== -1) {
            const newArray = [...prevData];
            newArray[index] = data;
            return newArray;
          } else {
            // Otherwise, add the new item to the array
            return [...prevData, data];
          }
        });
      }
    });

    return () => {
      // Clean up event listeners when component unmounts
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <div className="d-flex">
        <h4>Real time data</h4>
        <button
          type="button"
          onClick={() => setShowList(false)}
          className="btn btn-success ms-5"
        >
          Map
        </button>
        <button
          type="button"
          onClick={() => setShowList(true)}
          className="btn btn-secondary mx-2"
        >
          List
        </button>
      </div>
      {!showList ? (
        <MapComponent iotData={iotData} />
      ) : (
        <List
          items={iotData.map((data: any) => {
            return { ...data.iot, ...data.vehicle };
          })}
          slug={'Here you can see vehicles IoT data in real time'}
        />
      )}
    </>
  );
};

export default TrackingPage;
