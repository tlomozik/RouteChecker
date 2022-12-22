import {ActivityIndicator, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import getCurrentLocation from '../services/Location/getCurrentLocation';
import Map from '../components/map/Map';
import BottomPanel from '../components/map/BottomPanel';
import watchPosition from '../services/Location/watchPosition';
import watchAccelMeter from '../services/Accelerometer/watchAccelerometer';
import {useDispatch} from 'react-redux';
import {
  ADD_COORDS,
  ADD_ROAD_GAP,
  UPDATE_COORDS,
} from '../redux/slices/coordsSlice';
import {ADD_ACCEL_RECORDS} from '../redux/slices/accelSlice';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import PermissionAlert from '../components/alerts/PermissionAlert';
import createRoadGap from '../services/RoadGap/createRoadGap';
const HomeScreen = () => {
  const {recording} = useSelector(state => state.coords);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  //////callbacks initizalization
  const watchLocationCallback = useCallback(
    location => dispatch(UPDATE_COORDS(location)),
    [recording],
  );
  const currentLocationCallback = useCallback(location =>
    dispatch(ADD_COORDS(location)),
  );

  const watchAccelCallback = useCallback(
    accelData => {
      dispatch(ADD_ACCEL_RECORDS(accelData));
    },
    [recording],
  );

  const addRoadGap = useCallback(roadGap => {
    dispatch(ADD_ROAD_GAP(roadGap));
  });

  /////invoking hooks
  const [loading] = getCurrentLocation(currentLocationCallback);
  watchPosition(isFocused, recording, watchLocationCallback);
  watchAccelMeter(recording, watchAccelCallback);

  createRoadGap(addRoadGap);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {loading == 0 && (
        <ActivityIndicator
          style={{alignSelf: 'center', marginTop: 400}}
          size="large"
          color="#0000ff"
        />
      )}

      {loading == 1 && (
        <>
          <Map />
          <BottomPanel />
        </>
      )}

      {loading == 2 && PermissionAlert()}
    </View>
  );
};

export default HomeScreen;
