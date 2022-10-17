import {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

export default callback => {
  const [loading, setLoading] = useState(true);

  const getCurrentLocation = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            callback(position.coords);
            setLoading(false);
          },

          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, interval: 1000, distanceFilter: 100},
        );
      }
      if (permission === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Location permission denied');
      }
      if (permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Location permission denied and never ask again');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    let signal = true;
    if (signal) {
      getCurrentLocation();
    }

    return () => {
      signal = false;
    };
  }, []);

  return [loading];
};
