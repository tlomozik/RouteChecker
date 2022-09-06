import {ActivityIndicator, View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import {CentralizedContainer, GlobalContainer} from '../styles';
import getCurrentLocation from '../services/getCurrentLocation';
import Map from '../components/map/Map';
import BottomPanel from '../components/map/BottomPanel';
const HomeScreen = () => {
  const [useCurrentLocation, currentLocation, loading] = getCurrentLocation();
  const {latitude, longitude} = currentLocation;

  console.log(currentLocation);

  useEffect(() => {
    useCurrentLocation();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Map latitude={latitude} longitude={longitude} />
          <BottomPanel />
        </>
      )}
    </View>
  );
};

export default HomeScreen;
