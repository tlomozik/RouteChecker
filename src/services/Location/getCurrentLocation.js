import {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

export default callback => {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    let subscriber;

    const getCurrentLocation = async () => {
      try {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          subscriber = Geolocation.getCurrentPosition(
            position => {
              callback(position.coords);
              setLoading(1);
            },

            error => {
              console.log(error.code, error.message);
            },
            {
              enableHighAccuracy: true,
              interval: 1000,
              distanceFilter: 100,
              maximumAge: 0,
            },
          );
        }
        if (permission === PermissionsAndroid.RESULTS.DENIED) {
          console.log('Location permission denied');
          setLoading(2);
        }
        if (permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('Location permission denied and never ask again');
          setLoading(2);
        }
      } catch (err) {
        console.warn(err);
      }
    };

    getCurrentLocation();

    return () => {
      subscriber = null;
    };
  }, []);

  return [loading];
};
