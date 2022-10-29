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

const Map = () => {
  const {coords, coordsArray} = useSelector(state => state.coords);

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
  const {height, width} = useWindowDimensions();
  const mapViewRef = useRef(null);

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
        {coordsArray.length > 0 ? (
          <Polyline
            coordinates={[...coordsArray]}
            strokeColor="rgba(255,255,0,0.5)" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
          />
        ) : null}
      </MapView>
      {/* <TouchableOpacity
        onPress={() => {
          setRefresh(prevRefresh => !prevRefresh);
        }}
        style={{position: 'absolute', alignSelf: 'flex-end', zIndex: 10}}>
        <Image
          source={{
            uri: 'https://img.icons8.com/stickers/100/000000/location-update.png',
          }}
          style={styles.imgStyle}
        />
      </TouchableOpacity> */}
    </>
  );
};
const styles = StyleSheet.create({
  imgStyle: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    top: 25,
    right: 25,
  },
});
export default Map;
