import {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

export default (shouldTrack, callback) => {
  [subscriber, setSusbcriber] = useState(null);

  const watchLocation = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        const sub = Geolocation.watchPosition(
          position => {
            if (position.coords.latitude == 37.4220936) {
              return null;
            } else {
              callback(position.coords);
            }
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, interval: 1000, distanceFilter: 10},
        );
        setSusbcriber(sub);
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

  const stopWatching = watchId => {
    Geolocation.clearWatch(watchId);
  };

  useEffect(() => {
    if (shouldTrack) {
      console.log('Focused- initiate watchLocation');
      watchLocation();
    } else {
      console.log('UnFocused- cut');
      stopWatching(subscriber);
      setSusbcriber(null);
    }
  }, [shouldTrack]);
};
