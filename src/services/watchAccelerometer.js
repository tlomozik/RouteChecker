import {useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
export default () => {
  const initiateChange = () => {
    const change = setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms

    console.log(change);
  };

  useEffect(() => {
    let subscriber;

    const watchAccelMeter = async () => {};

    return () => {
      console.log('stopAccel');
    };
  }, [third]);
};
