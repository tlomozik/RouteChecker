import {StyleSheet, Text, Button, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GlobalContainer} from '../styles';
import watchAccelMeter from '../services/Accelerometer/watchAccelerometer';
import {useSelector} from 'react-redux';
import analyzeAccelerometer from '../services/Accelerometer/analyzeAccelerometer';
const TestingScreen = () => {
  const [shouldWatchAccel, setShouldWatchAccel] = useState(false);
  const {accelArray} = useSelector(state => state.accel);

  return (
    <GlobalContainer>
      <Text style={{fontWeight: '800', color: 'black'}}>Testing screen</Text>
      <Button
        title="Start watching accel"
        onPress={() => {
          setShouldWatchAccel(prevShouldWatchAccel => !prevShouldWatchAccel);
        }}
      />

      <Button
        title="Test records"
        onPress={() => {
          analyzeAccelerometer(accelArray);
        }}
      />
      <View style={{marginBottom: 100}}>
        {/* <FlatList
          data={accelArray}
          renderItem={({item}) => (
            <Text style={{fontWeight: '800', color: 'black'}}>{item}</Text>
          )}
          keyExtractor={index => index}
        /> */}
      </View>

      {/* <Text style={{color:"black"}}>Test</Text> */}
    </GlobalContainer>
  );
};

export default TestingScreen;
