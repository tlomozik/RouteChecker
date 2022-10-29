import React, {useState} from 'react';
import {
  Button,
  Paragraph,
  Dialog as RNPDialog,
  Portal,
  Provider,
  TextInput,
} from 'react-native-paper';

const CustomDialog = ({show, setShow, callback}) => {
  const [trackName, setTrackName] = useState('');

  const hideDialog = () => setShow(false, '');

  const handleAction = () => {
    hideDialog();
    callback(trackName);
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
              <RNPDialog.Title>Saving</RNPDialog.Title>
              <RNPDialog.Content>
                <Paragraph>Please enter track's name</Paragraph>
                <TextInput
                  placeholder="Track's name"
                  value={trackName}
                  onChangeText={setTrackName}
                />
              </RNPDialog.Content>
              <RNPDialog.Actions>
                <Button onPress={handleAction}>Submit</Button>
                <Button onPress={hideDialog}>Dismiss</Button>
              </RNPDialog.Actions>
            </>
          ) : (
            <>
              <RNPDialog.Title>Warning</RNPDialog.Title>
              <RNPDialog.Content>
                <Paragraph>
                  Are you sure you want to delete current track?
                </Paragraph>
              </RNPDialog.Content>
              <RNPDialog.Actions>
                <Button onPress={handleAction}>Yes</Button>
                <Button onPress={hideDialog}>No</Button>
              </RNPDialog.Actions>
            </>
          )}
        </RNPDialog>
      </Portal>
    </Provider>
  );
};

export default CustomDialog;
