import {ActivityIndicator, View, Text, Button} from 'react-native';
import React from 'react';
import getCurrentLocation from '../services/getCurrentLocation';
import Map from '../components/map/Map';
import BottomPanel from '../components/map/BottomPanel';
import watchPosition from '../services/watchPosition';
import {useDispatch} from 'react-redux';
import {ADD_COORDS, UPDATE_COORDS} from '../redux/slices/coordsSlice';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const HomeScreen = () => {
  const {recording} = useSelector(state => state.coords);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [loading] = getCurrentLocation(location =>
    dispatch(ADD_COORDS(location)),
  );

  watchPosition(isFocused, location =>
    dispatch(UPDATE_COORDS(location, recording)),
  );

  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
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
