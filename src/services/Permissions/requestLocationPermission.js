import {PermissionsAndroid} from 'react-native';

const requestCameraPermission = async setPermission => {
  try {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      setPermission(permission);
    }
    if (permission === PermissionsAndroid.RESULTS.DENIED) {
      setPermission(permission);
    }
    if (permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      setPermission(permission);
    }
  } catch (err) {
    console.warn(err);
  }
};
export default requestCameraPermission;
