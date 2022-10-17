import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {RecordButton} from '../../styles';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {CommonText} from '../../styles';
import {useDispatch} from 'react-redux';
import {START_RECORDING, STOP_RECORDING} from '../../redux//slices/coordsSlice';

const handleCoordsShowing = coordsArray => {
  coordsArray.map(item => console.log(item.latitude, ' ', item.longitude));
};

const BottomPanel = () => {
  const {coords, coordsArray, recording} = useSelector(state => state.coords);
  const {latitude, longitude} = coords;
  const dispatch = useDispatch();

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
            backgroundColor: 'black',
            marginBottom: 20,
          }}></View>
        <View>
          <CommonText style={{alignSelf: 'center'}}>
            Aktualna pozycja
          </CommonText>
          <CommonText>x: {latitude}</CommonText>
          <CommonText>y: {longitude}</CommonText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {!recording ? (
              <RecordButton
                icon="play"
                mode="contained"
                labelStyle={{color: 'black'}}
                onPress={() => dispatch(START_RECORDING(recording))}>
                <Text> Start</Text>
              </RecordButton>
            ) : (
              <RecordButton
                icon="stop"
                mode="contained"
                labelStyle={{color: 'black'}}
                onPress={() => dispatch(STOP_RECORDING(recording))}>
                <Text> Stop</Text>
              </RecordButton>
            )}

            {coordsArray.length > 0 ? (
              <RecordButton
                icon="map-check-outline"
                mode="contained"
                labelStyle={{color: 'black'}}
                onPress={() => handleCoordsShowing(coordsArray)}>
                <Text> Show</Text>
              </RecordButton>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomPanel;

const styles = StyleSheet.create({
  imgStyle: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
