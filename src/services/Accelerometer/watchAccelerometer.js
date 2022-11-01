import {useEffect} from 'react';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';
import {useDispatch} from 'react-redux';
import {ADD_ACCEL_RECORDS} from '../../redux/slices/accelSlice';
import {LogBox} from 'react-native';
export default watchAccelMeter = shouldWatch => {
  const dispatch = useDispatch();
  LogBox.ignoreLogs(['new NativeEventEmitter()']);
  // ignorowanie
  // WARN  `new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.
  // WARN  `new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.
  useEffect(() => {
    let subscriber;

    function watcher() {
      setUpdateIntervalForType(SensorTypes.accelerometer, 400);
      subscriber = accelerometer
        .pipe(
          map(({x, y, z}) => x + y + z),
          // filter(speed => speed > 9),
        )
        .subscribe(speed => {
          console.log(speed);
          dispatch(ADD_ACCEL_RECORDS(speed));
        });
    }
    if (shouldWatch) {
      watcher();
    } else null;
    return () => {
      console.log('Stop watching accel');

      if (subscriber) {
        console.log('unscribe');
        subscriber.unsubscribe();
      }
    };
  }, [shouldWatch]);
};
