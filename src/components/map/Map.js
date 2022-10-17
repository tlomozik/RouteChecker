import React, {useState, useRef} from 'react';
import {useWindowDimensions} from 'react-native';
import MapView, {Circle, Polyline} from 'react-native-maps';
import mapStyle from '../../styles/map/mapStyle';
import {useSelector} from 'react-redux';

const Map = () => {
  const {coords, coordsArray} = useSelector(state => state.coords);

  console.log(coordsArray.length);
  const {height, width} = useWindowDimensions();
  const mapViewRef = useRef(null);

  return (
    <MapView
      ref={mapViewRef}
      zoomEnabled={true}
      scrollEnabled={false}
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
      {coordsArray.length > 0 ? (
        <Polyline
          coordinates={[coordsArray.latitude, coordsArray.longitude]}
          strokeColor="rgba(255,255,0,0.5)" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={6}
        />
      ) : null}
    </MapView>
  );
};

export default Map;
