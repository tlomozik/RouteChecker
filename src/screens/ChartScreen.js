import {StyleSheet, Text, Button, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CentralizedContainer, GlobalContainer} from '../styles';

import {useSelector} from 'react-redux';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
} from 'react-native-responsive-linechart';

const ChartScreen = () => {
  const {accelArray} = useSelector(state => state.accel);

  const data = accelArray.map(item => {
    return {x: item.id, y: item.z};
  });

  return (
    <GlobalContainer>
      {/* <View style={{marginBottom: 100}}>
        <FlatList
          data={accelArray}
          renderItem={({item}) => (
            <Text style={{fontWeight: '800', color: 'black'}}>
              {item.id} ---- {item.value}
            </Text>
          )}
          keyExtractor={item => item.id}
        />
      </View> */}

      {accelArray.length > 0 ? (
        <Chart
          style={{height: 400, width: 400}}
          data={data}
          padding={{left: 40, bottom: 20, right: 20, top: 20}}
          yDomain={{min: 0, max: 20}}
          viewport={{size: {width: 10}}}>
          <VerticalAxis
            tickCount={13}
            theme={{labels: {formatter: v => v.toFixed(1)}}}
          />
          <HorizontalAxis
            tickCount={data.length}
            theme={{labels: {formatter: v => v.toFixed(0)}}}
          />
          <Area
            theme={{
              gradient: {
                from: {color: '#f39c12', opacity: 0.4},
                to: {color: '#f39c12', opacity: 0.4},
              },
            }}
            smoothing="cubic-spline"
          />
          <Line
            smoothing="cubic-spline"
            theme={{
              stroke: {color: '#ffa502', width: 5},
            }}
          />
        </Chart>
      ) : null}
    </GlobalContainer>
  );
};

export default ChartScreen;
