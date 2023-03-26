import React, {useState} from 'react';
import {
  Button,
  Paragraph,
  Dialog as RNPDialog,
  Portal,
  Provider,
  TextInput,
} from 'react-native-paper';
import {Alert} from 'react-native';
const CustomDialog = ({show, setShow, callback}) => {
  const [trackName, setTrackName] = useState('');

  const hideDialog = () => setShow(false, '');

  const handleAction = () => {
    hideDialog();
    callback(trackName);
    Alert.alert(
      'Informacja',
      'Pomyślnie wykonano operację',
      // [{text: 'OK', onPress: () => BackHandler.exitApp()}],
    );
  };

  return (
    <Provider>
      <Portal>
        <RNPDialog
          visible={show.signal}
          onDismiss={hideDialog}
          style={{
            alignSelf: 'center',
            width: '80%',
          }}>
          {show.type == 'save' ? (
            <>
              <RNPDialog.Title>Zapisywanie</RNPDialog.Title>
              <RNPDialog.Content>
                <Paragraph>Proszę wpisać nazwę trasy</Paragraph>
                <TextInput
                  placeholder="Nazwa"
                  value={trackName}
                  onChangeText={setTrackName}
                />
              </RNPDialog.Content>
              <RNPDialog.Actions>
                <Button onPress={handleAction}>Zapisz</Button>
                <Button onPress={hideDialog}>Odrzuć</Button>
              </RNPDialog.Actions>
            </>
          ) : (
            <>
              <RNPDialog.Title>Ostrzeżenie</RNPDialog.Title>
              <RNPDialog.Content>
                <Paragraph>Czy na pewno chcesz usunąć trasę?</Paragraph>
              </RNPDialog.Content>
              <RNPDialog.Actions>
                <Button onPress={handleAction}>Tak</Button>
                <Button onPress={hideDialog}>Nie</Button>
              </RNPDialog.Actions>
            </>
          )}
        </RNPDialog>
      </Portal>
    </Provider>
  );
};

export default CustomDialog;
