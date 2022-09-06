import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  StatusBar,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import mapStyle from '../../styles/map/mapStyle';

const Map = ({latitude, longitude}) => {
  const [pin, setPin] = useState({latitude, longitude});
  // const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;
  // const screenHeight = Dimensions.get('screen').height;

  // const statusBarHeight = StatusBar.currentHeight || 24;
  const {height, width} = useWindowDimensions();
  const mapViewRef = useRef(null);
  return (
    <MapView
      ref={mapViewRef}
      provider="google" // remove if not using Google Maps
      style={{
        width,
        height,
      }}
      customMapStyle={mapStyle}
      //  showsTraffic={true}

      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onMarkerDragEnd={e => {
        setPin({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        });
        mapViewRef.current?.animateToRegion(
          {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          1000,
        );
      }}>
      <Marker
        redraw
        draggable={true}
        onDragStart={e => console.log(pin)}
        onDragEnd={e => {
          console.log(pin);
        }}
        coordinate={{
          latitude: pin.latitude,
          longitude: pin.longitude,
        }}
      />
    </MapView>
  );
};

export default Map;
