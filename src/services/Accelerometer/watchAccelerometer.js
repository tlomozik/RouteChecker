import {useEffect, useRef} from 'react';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';
import {useSelector} from 'react-redux';
import {LogBox} from 'react-native';
import moment from 'moment';
import 'moment/locale/pl';
const identifyGapByAvg = (testedArray, arrayLength) => {
  const identifiedGapsArray = [];

  console.log(
    'Testowany zakres: ',
    arrayLength - 4 + '-' + arrayLength,
    testedArray,
  );

  let average = testedArray.reduce((a, b) => a + b, 0) / 5;
  console.log('Średnia ', average);

  testedArray.map((item, index) => {
    if (
      (item > average && item - average > 3) || //jeśli nierówność większa od średniej
      (item < average && average - item > 3) //jeśli nierówność mniejsza
    ) {
      console.log('Duża nierówność o indeksie: ', index + 1 + arrayLength - 5);
      identifiedGapsArray.push({id: index + 1 + arrayLength - 5, z: item});
    }
  });
  if (identifiedGapsArray.length > 0) {
    console.log(
      'Wszystkie wykryte nierówności w tym zakresie',
      identifiedGapsArray,
    );
  } else {
    console.log('Nie wykryto nierówności w tym zakresie');
  }
};

const identifyGapByMaxMin = testedArray => {
  // console.log(testedArray);

  let a = testedArray[0];
  let b = testedArray[1];
  let diff = 0;
  if (a > b) {
    diff = a - b;
  } else {
    diff = b - a;
  }

  if (diff > 2)
    console.log('Duża nierówność o różnicy: ', diff, 'Wartości: ', a, b);
};

export default watchAccelMeter = (
  shouldWatch,
  watchCallback,
  roadGapCallback,
) => {
  LogBox.ignoreLogs(['new NativeEventEmitter()']);
  //  const {coords} = useSelector(state => state.coords);
  const prevArray = useRef([]);
  // ignorowanie
  // WARN  `new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.
  // WARN  `new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.

  useEffect(() => {
    let subscriber;
    let counter = 0;

    function watcher() {
      setUpdateIntervalForType(SensorTypes.accelerometer, 200);
      subscriber = accelerometer.subscribe(({x, y, z, timestamp}) => {
        counter++;
        moment.locale('pl');
        timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
        speed = {
          z: Math.abs(z),
          timestamp,
          id: counter,
        };
        watchCallback(speed);
        prevArray.current.push(speed.z);

        if (speed.z > 11) {
          roadGapCallback(speed);
        }

        ////////Algorytm ze średnią
        if (
          prevArray.current.length % 5 == 0 &&
          prevArray.current.length != 0
        ) {
          identifyGapByAvg(
            prevArray.current.slice(-5),
            prevArray.current.length,
          );
        }

        ////////

        ////////Algorytm porównujący dwa odczyty
        // if (
        //   prevArray.current.length % 2 == 0 &&
        //   prevArray.current.length != 0
        // ) {
        //   identifyGapByMaxMin(
        //     prevArray.current.slice(-2),
        //     prevArray.current.length,
        //   );
        // }

        /////////
      });
    }

    if (shouldWatch) {
      watcher();
    } else null;
    return () => {
      if (subscriber) {
        counter = 0;
        prevArray.current = [];
        subscriber.unsubscribe();
      }
    };
  }, [shouldWatch]);
};
