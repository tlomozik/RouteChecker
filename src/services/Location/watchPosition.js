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
        subscriber = Geolocation.watchPosition(
          position => {
            if (position.coords.latitude > 50.2616) {
              callback({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
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
            distanceFilter: 5,
          },
        );
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
      console.log('unsubscribe watchLocation');
      stopWatching(subscriber);
    };
  }, [shouldTrack]);
};
