import {useEffect} from 'react';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';
import {useDispatch} from 'react-redux';

import {LogBox} from 'react-native';
export default watchAccelMeter = (shouldWatch, callback) => {
  LogBox.ignoreLogs(['new NativeEventEmitter()']);
  // ignorowanie
  // WARN  `new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.
  // WARN  `new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.
  useEffect(() => {
    let subscriber;

    function watcher() {
      setUpdateIntervalForType(SensorTypes.accelerometer, 400);
      subscriber = accelerometer
        // .pipe(
        //   map(({x, y, z}) => x + y + z),
        //   // filter(speed => speed > 9),
        // )
        .subscribe(({z}) => {
          speed = Math.abs(z);
          //      console.log({x, y, z, speed});

          callback(speed);
        });
    }

    // function watcher() {
    //   setUpdateIntervalForType(SensorTypes.accelerometer, 400);
    //   subscriber = accelerometer.subscribe(({x, y, z}) => {
    //     console.log(x, y, z);
    //     //  dispatch(ADD_ACCEL_RECORDS(speed));
    //   });
    // }

    if (shouldWatch) {
      watcher();
    } else null;
    return () => {
      null;

      if (subscriber) {
        console.log('unsubscribe accel');
        subscriber.unsubscribe();
      }
    };
  }, [shouldWatch]);
};
