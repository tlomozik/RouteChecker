import {useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

export default (isFocused, shouldTrack, callback) => {
  const stopWatching = watchId => {
    Geolocation.clearWatch(watchId);
  };

  useEffect(() => {
    let subscriber;

    const watchLocation = async () => {
      console.log('watchLocation');
      try {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          subscriber = Geolocation.watchPosition(
            position => {
              if (position.coords.latitude > 50.2616) {
                callback(position.coords);
              } else {
                return null;
              }
            },
            error => {
              console.log(error.code, error.message);
            },
            {
              enableHighAccuracy: true,
              interval: 1000,
              distanceFilter: 10,
            },
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

    if (shouldTrack && isFocused) {
      console.log('Focused- initiate watchLocation');
      watchLocation();
    } else {
      console.log('stopWatching');
      if (subscriber) {
        stopWatching(subscriber);
      }
    }

    return () => {
      stopWatching(subscriber);
    };
  }, [shouldTrack]);
};
