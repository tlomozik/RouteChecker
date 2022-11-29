import {ActivityIndicator, View, Image, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import getCurrentLocation from '../services/Location/getCurrentLocation';
import Map from '../components/map/Map';
import BottomPanel from '../components/map/BottomPanel';
import watchPosition from '../services/Location/watchPosition';
import watchAccelMeter from '../services/Accelerometer/watchAccelerometer';
import {useDispatch} from 'react-redux';
import {ADD_COORDS, UPDATE_COORDS} from '../redux/slices/coordsSlice';
import {ADD_ACCEL_RECORDS} from '../redux/slices/accelSlice';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const HomeScreen = () => {
  const {recording, coordsArray} = useSelector(state => state.coords);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  //////callbacks initizalization
  const watchLocationCallback = useCallback(
    location => dispatch(UPDATE_COORDS(location, recording)),
    [recording],
  );
  const currentLocationCallback = useCallback(location =>
    dispatch(ADD_COORDS(location)),
  );

  const watchAccelCallback = useCallback(
    accelData => dispatch(ADD_ACCEL_RECORDS(accelData)),
    [recording],
  );

  /////invoking hooks
  const [loading] = getCurrentLocation(currentLocationCallback);
  watchPosition(isFocused, recording, watchLocationCallback);
  watchAccelMeter(recording, watchAccelCallback);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {loading ? (
        <ActivityIndicator
          style={{alignSelf: 'center'}}
          size="large"
          color="#0000ff"
        />
      ) : (
        <>
          <Map />
          <BottomPanel />
        </>
      )}
    </View>
  );
};

export default HomeScreen;
