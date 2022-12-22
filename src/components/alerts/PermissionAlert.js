import {Alert, BackHandler} from 'react-native';

const PermissionAlert = () => {
  Alert.alert(
    'Uwaga',
    'Do poprawnego działania aplikacji musisz udostępnić swoją lokalizację. Zmień opcję w ustawieniach swojego telefonu',
    [{text: 'OK', onPress: () => BackHandler.exitApp()}],
  );
};

export default PermissionAlert;
