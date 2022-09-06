import {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import requestLocationPermission from './Permissions/requestLocationPermission';

export default () => {
  const [currentLocation, setCurrentLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState();

  useEffect(() => {
    requestLocationPermission(setPermission);
  }, []);

  const getCurrentLocation = () => {
    if (permission === 'granted') console.log('Location permission granted');
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords);
        setCurrentLocation(position.coords);
        setLoading(false);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    if (permission === 'denied') {
      console.log('Location permission denied');
    }

    if (permission === 'never_ask_again') {
      console.log('Location permission denied and never ask again');
    }
  };

  return [getCurrentLocation, currentLocation, loading];
};
