import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {RecordButton} from '../../styles';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  START_RECORDING,
  STOP_RECORDING,
  WIPE_COORDS,
} from '../../redux//slices/coordsSlice';
import {WIPE_ACCEL_RECORDS} from '../../redux//slices/accelSlice';
import CustomDialog from './CustomDialog';
import addTrack from '../../services/Location/addTrack';
import analyzeAccelerometer from '../../services/Accelerometer/analyzeAccelerometer';

const handleCoordsShowing = (coordsArray, accelArray) => {
  coordsArray.map(item => console.log(item.latitude, ' ', item.longitude));
  accelArray.map(item => console.log(item));
};

const BottomPanel = () => {
  const {coordsArray, recording} = useSelector(state => state.coords);
  const {accelArray} = useSelector(state => state.accel);
  const dispatch = useDispatch();

  const [shouldShow, setShouldShow] = useState({signal: false, type: ''});

  const handleTrackDeleting = () => {
    dispatch(WIPE_COORDS());
    dispatch(WIPE_ACCEL_RECORDS());
  };

  const handleTrackSaving = track => {
    const [saveTrack] = addTrack();
    saveTrack(coordsArray, accelArray, track);
    handleTrackDeleting();
  };

  ////////////////////////////////////Animation
  const {height, width} = useWindowDimensions();
  const MAX_TRANSLATE_Y = -height + height / 2.5;
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});

  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{translateY: translateY.value}]};
  });

  const pan = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })

    .onUpdate(e => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })

    .onEnd(e => {
      if (translateY.value != MAX_TRANSLATE_Y) {
        translateY.value = withSpring(-height / 6, {damping: 50});
      }
    });

  const tap = Gesture.Tap().onStart(() => {
    translateY.value = withSpring(MAX_TRANSLATE_Y);
  });

  useEffect(() => {
    translateY.value = withSpring(-height / 6, {damping: 50});
  }, []);

  ////////////////////////////////////Animation
  return (
    <>
      <GestureDetector gesture={Gesture.Exclusive(pan, tap)}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              backgroundColor: 'white',
              width: width - 20,
              opacity: 1,
              height: height,
              top: height,
              alignSelf: 'center',
              alignItems: 'center',
              padding: 5,
              borderRadius: 20,
            },
            animatedStyles,
          ]}>
          <View
            style={{
              height: 5,
              width: 100,
              borderRadius: 10,
              alignSelf: 'center',
              backgroundColor: 'black',
              marginBottom: 20,
            }}></View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            {!recording && coordsArray == 0 ? (
              <RecordButton
                icon="play"
                mode="contained"
                labelStyle={{color: 'black'}}
                onPress={() => dispatch(START_RECORDING(recording))}>
                <Text> Start</Text>
              </RecordButton>
            ) : null}
            {recording ? (
              <RecordButton
                icon="stop"
                mode="contained"
                labelStyle={{color: 'black'}}
                onPress={() => dispatch(STOP_RECORDING(recording))}>
                <Text> Stop</Text>
              </RecordButton>
            ) : null}

            {coordsArray.length > 0 && !recording ? (
              <>
                <RecordButton
                  icon="map-check-outline"
                  mode="contained"
                  labelStyle={{color: 'black'}}
                  onPress={() => handleCoordsShowing(coordsArray, accelArray)}>
                  <Text> Show</Text>
                </RecordButton>

                <RecordButton
                  icon="content-save-all"
                  mode="contained"
                  labelStyle={{color: 'black'}}
                  onPress={() => setShouldShow({signal: true, type: 'save'})}>
                  <Text> Save</Text>
                </RecordButton>

                <RecordButton
                  icon="trash-can-outline"
                  mode="contained"
                  labelStyle={{color: 'black'}}
                  onPress={() => setShouldShow({signal: true, type: 'delete'})}>
                  <Text> Delete </Text>
                </RecordButton>

                <RecordButton
                  icon="trash-can-outline"
                  mode="contained"
                  labelStyle={{color: 'black'}}
                  onPress={() => analyzeAccelerometer(coordsArray)}>
                  <Text> Ana </Text>
                </RecordButton>
              </>
            ) : null}
          </View>
        </Animated.View>
      </GestureDetector>
      {shouldShow.signal == true ? (
        <CustomDialog
          show={shouldShow}
          setShow={setShouldShow}
          callback={name => {
            if (shouldShow.type === 'delete') return handleTrackDeleting();
            else return handleTrackSaving(name);
          }}
        />
      ) : null}
    </>
  );
};

export default BottomPanel;
