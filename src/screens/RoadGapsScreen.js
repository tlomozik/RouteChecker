import {
  useWindowDimensions,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';
import React, {useCallback, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import MapView, {Marker} from 'react-native-maps';
import getCurrentLocation from '../services/Location/getCurrentLocation';
import {useDispatch} from 'react-redux';
import {ADD_COORDS} from '../redux/slices/coordsSlice';
import {CentralizedContainer} from '../styles';
import getRoadGaps from '../services/RoadGap/getRoadGaps';
import {ShowGapsButton} from '../styles/roadGapsMap/ShowGapsButton';
import {Text} from 'react-native-paper';
const RoadGapsScreen = () => {
  const {coords} = useSelector(state => state.coords);
  const {height, width} = useWindowDimensions();
  const [forceRefresh, setForceRefresh] = useState(0);
  const dispatch = useDispatch();
  const currentLocationCallback = useCallback(location => {
    dispatch(ADD_COORDS(location));
  }, []);
  const [loading] = getCurrentLocation(currentLocationCallback);

  const [switcher, setSwitcher] = useState();
  const potholes = useRef(null);
  const handleGettingGaps = async () => {
    const [roadGaps] = await getRoadGaps();
    potholes.current = roadGaps;
    setSwitcher(true);
  };

  const handleDeletingGaps = () => {
    potholes.current = null;
    setForceRefresh(Math.floor(Math.random() * 10000)); ////// refresh mapy
    setSwitcher(false);
  };

  return (
    <>
      {loading == 0 && (
        <ActivityIndicator
          style={{alignSelf: 'center', marginTop: 400}}
          size="large"
          color="#0000ff"
        />
      )}

      {loading == 1 && (
        <>
          <CentralizedContainer>
            <MapView
              key={forceRefresh} ////refresh mapy
              provider="google"
              style={{
                width,
                height,
              }}
              region={{
                ...coords,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}>
              {potholes.current?.gaps?.map((item, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude,
                    }}
                    // key={index}
                    title={`Uchwycone: ${item.timestamp}`}
                  />
                );
              })}
            </MapView>
          </CentralizedContainer>
          <View
            style={{
              backgroundColor: '#fff8f0',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: 'black',
              width: '100%',
              height: '20%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {potholes.current ? (
              <Text>
                Aktualna liczba zarejestrowanych nierówności:
                {potholes.current.gaps.length}
              </Text>
            ) : null}

            <ShowGapsButton onPress={() => handleGettingGaps()}>
              {switcher ? <Text>Odśwież</Text> : <Text>Pokaż</Text>}
            </ShowGapsButton>

            {switcher ? (
              <ShowGapsButton onPress={() => handleDeletingGaps()}>
                <Text>Wyczyść</Text>
              </ShowGapsButton>
            ) : null}

            {/* <ShowGapsButton
              onPress={() => {
                setTest(prevTest => !prevTest);
              }}>
              <Text>Siema</Text>
            </ShowGapsButton> */}
          </View>
        </>
      )}
    </>
  );
};

export default RoadGapsScreen;
