import React, {useRef, useState} from 'react';
import {
  useWindowDimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, {Circle, Polyline} from 'react-native-maps';
import mapStyle from '../../styles/map/mapStyle';
import {useSelector} from 'react-redux';
import analyzeAccelerometer from '../../services/Accelerometer/analyzeAccelerometer';

const Map = () => {
  const {coords, coordsArray: array} = useSelector(state => state.coords);

  const coordsArray = array.map(item => {
    return {latitude: item.latitude, longitude: item.longitude};
  });

  // console.log(coordsArray);

  ///Getting polylinesTab
  const [polylinesTab] = analyzeAccelerometer(coordsArray);

  // if (polylinesTab) {
  //   console.log(polylinesTab);
  // }
  ///

  coordsArray.map((element, index) =>
    console.log(
      'Z TABLICY   ',
      index,
      element.latitude,
      '   ',
      element.longitude,
    ),
  );
  console.log('Z COORDS   ', coords.latitude, '   ', coords.longitude);

  ////Map sizing
  const {height, width} = useWindowDimensions();
  const mapViewRef = useRef(null);

  /////

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
        {coords ? (
          <Circle
            center={coords}
            radius={20}
            strokeColor={'rgba(255, 0, 0, 1)'}
            fillColor={'rgba(255, 0, 0, 0.3)'}
          />
        ) : null}

        {polylinesTab.map((item, index) => {
          console.log(item.tab);
          return (
            <Polyline
              key={index}
              coordinates={item.tab}
              strokeColor={item.color(index)}
              strokeWidth={6}
            />
          );
        })}
      </MapView>
    </>
  );
};

export default Map;
