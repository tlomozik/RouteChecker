import React, {useRef, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import MapView, {Circle, Polyline, Marker} from 'react-native-maps';
import mapStyle from '../../styles/map/mapStyle';
import {useSelector} from 'react-redux';
import combineAccelWithCoords from '../../services/Polyline/createPolylines';

const Map = () => {
  const {coords, coordsArray, roadGaps} = useSelector(state => state.coords);
  const {accelArray: array1} = useSelector(state => state.accel);
  const prevPolylinesTab = useRef([]);
  const counter = useRef(0);

  const holes = [
    {latitude: 50.29884, longitude: 19.12162, title: 'Pierwszy'},
    {latitude: 50.29793, longitude: 19.1203, title: 'Drugi'},
    {latitude: 50.29262, longitude: 19.11417, title: 'Trzeci'},
  ];

  // const coordsArray = array.map(item => {
  //   return {latitude: item.latitude, longitude: item.longitude};
  // });
  const accelArray = array1.map(item => {
    return item.z;
  });

  ////Map sizing
  const {height, width} = useWindowDimensions();
  const mapViewRef = useRef(null);

  // console.log(prevPolylinesTab.current);

  useEffect(() => {
    if (coordsArray.length % 3 == 0 && coordsArray.length != 0) {
      counter.current++;
      const polyline = combineAccelWithCoords(
        counter.current,
        coordsArray,
        accelArray,
      );

      prevPolylinesTab.current.push(...polyline);
    }

    return () => {
      if (coordsArray.length == 0) {
        console.log('Polylines cleanup');
        counter.current = 0;
        prevPolylinesTab.current = [];
      }
      //    prevPolylinesTab.current = null;
    };
  }, [coordsArray.length]);

  return (
    <>
      <MapView
        ref={mapViewRef}
        zoomEnabled={true}
        provider="google"
        style={{
          width,
          height,
        }}
        customMapStyle={mapStyle}
        initialRegion={{
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={{
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {prevPolylinesTab.current.map((item, index) => {
          if (coordsArray.length > 0) {
            return (
              <Polyline
                key={index}
                coordinates={item.tab}
                strokeColor={item.color}
                strokeWidth={6}
              />
            );
          } else null;
        })}

        {roadGaps.map((item, index) => {
          if (roadGaps.length > 0) {
            return (
              <Marker
                coordinate={item?.accelRecord}
                key={index}
                title={`Uchwycone: ${item?.timestamp}`}
              />
            );
          }
        })}

        {coords ? (
          <Circle
            center={coords}
            radius={20}
            strokeColor={'rgba(255, 0, 0, 1)'}
            fillColor={'rgba(255, 0, 0, 0.3)'}
          />
        ) : null}
      </MapView>
    </>
  );
};

export default Map;
