import {useEffect} from 'react';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';

import {LogBox} from 'react-native';

export default watchAccelMeter = (shouldWatch, watchCallback) => {
  LogBox.ignoreLogs(['new NativeEventEmitter()']);
  // ignorowanie
  // WARN  `new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.
  // WARN  `new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.
  useEffect(() => {
    let subscriber;
    let counter = 0;
    function watcher() {
      setUpdateIntervalForType(SensorTypes.accelerometer, 300);
      subscriber = accelerometer
        // .pipe(
        //   map(({x, y, z}) => x + y + z),
        //   // filter(speed => speed > 9),
        // )
        .subscribe(({x, y, z, timestamp}) => {
          counter++;
          let dateFormat = new Date(timestamp),
            speed = {
              z: Math.abs(z),
              // x: Math.abs(x),
              // y: Math.abs(y),
              timestamp: `${dateFormat.getHours()}:${dateFormat.getMinutes()}:${dateFormat.getSeconds()}:${dateFormat.getMilliseconds()}`,
              id: counter,
            };
          // console.log({speed});
          // if (speed.z > 11) {
          //   console.log('higher than 15, add to roadGaps');
          //   roadGapCallback(speed.z);
          // }
          watchCallback(speed);
        });
    }

    if (shouldWatch) {
      watcher();
    } else null;
    return () => {
      if (subscriber) {
        console.log('unsubscribe accel');
        counter = 0;
        subscriber.unsubscribe();
      }
    };
  }, [shouldWatch]);
};
