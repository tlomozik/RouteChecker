import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import React, {useEffect} from 'react';

const BottomPanel = () => {
  const {height, width} = useWindowDimensions();
  const MAX_TRANSLATE_Y = -height + height / 2.5;
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});

  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{translateY: translateY.value}]};
  });

  const gesture = Gesture.Pan()
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

  useEffect(() => {
    translateY.value = withSpring(-height / 6, {damping: 50});
  }, []);

  return (
    <GestureDetector gesture={gesture}>
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
        <Text>BottomPanel</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomPanel;

const styles = StyleSheet.create({
  bottomPanel: {},
});
