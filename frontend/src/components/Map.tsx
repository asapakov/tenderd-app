import React, { useEffect, useRef } from 'react';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import logo from '../assets/logo.svg';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';

const MapComponent = ({ iotData }: any) => {
  console.log(iotData, 'iotData');
  const mapRef = useRef<any>(null); // Ref to store the map DOM element
  const markersLayerRef = useRef<any>(null);

  useEffect(() => {
    // Create a new OpenLayers map when the component mounts
    const map = new Map({
      target: mapRef.current, // The target DOM element for the map
      layers: [
        new TileLayer({
          source: new OSM(), // Use OpenStreetMap as the base layer
        }),
      ],
      view: new View({
        center: [
          iotData[0]?.iot?.longitude || 55.315384,
          iotData[0]?.iot?.latitude || 25.264444,
        ], // Dubai, UAE
        zoom: 3, // Initial zoom level (adjust as needed)
      }),
    });
    const markerFeatures = iotData.map(
      (data: any) =>
        new Feature({
          geometry: new Point(
            fromLonLat([data?.iot?.longitude, data?.iot?.latitude]),
          ),
          text: 'asd',
        }),
    );
    if (!markersLayerRef.current) {
      markersLayerRef.current = new VectorLayer({
        source: new VectorSource(),
      });
      map.addLayer(markersLayerRef.current);
    }

    // Apply the style to each marker feature
    markerFeatures.forEach((feature: any) => {
      console.log(feature?.values?.text);
      // Create a style for the markers
      const textStyle = new Text({
        text: feature?.values?.text, // Set the text you want to display
        offsetY: -15, // Offset the text above the marker
        font: '12px Arial', // Define font style and size
        fill: new Fill({ color: '#000' }), // Define text color
        stroke: new Stroke({ color: '#fff', width: 2 }), // Define text stroke style
      });
      const markerStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1], // Center the icon image on the marker's coordinates
          src: logo, // Path to your custom icon image
          scale: 0.2, // Adjust the scale of the icon if needed
        }),
        text: textStyle, // Assign the text style to the marker style
      });
      feature.setStyle(markerStyle);
    });
    const vectorSource = markersLayerRef.current.getSource();
    const existingFeatures = vectorSource.getFeatures();

    // Remove features that are no longer in the new data
    existingFeatures.forEach((feature: any) => {
      if (!markerFeatures.find((f: any) => f.getId() === feature.getId())) {
        vectorSource.removeFeature(feature);
      }
    });

    // Add new features or update existing ones
    markerFeatures.forEach((feature: any) => {
      const existingFeature = existingFeatures.find(
        (f: any) => f.getId() === feature.getId(),
      );
      if (existingFeature) {
        existingFeature.setGeometry(feature.getGeometry());
      } else {
        vectorSource.addFeature(feature);
      }
    });

    // Create a vector layer for the markers
    const markersLayer = new VectorLayer({
      source: new VectorSource({
        features: markerFeatures,
      }),
    });

    map.addLayer(markersLayer);
    return () => {
      // @ts-expect-error
      map.setTarget(null);
    };
  }, [iotData]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default MapComponent;
