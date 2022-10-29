import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';

const ConfirmDialog = ({show, setShow}) => {
  const hideDialog = () => setShow(false);

  const handleTrackSaving = () => {};
  return (
    <Provider>
      <Portal>
        <Dialog
          visible={show}
          onDismiss={hideDialog}
          style={{
            alignSelf: 'center',
            width: '80%',
          }}>
          <Dialog.Title>Warning</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Saving</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleTrackSaving}>Yes</Button>
            <Button onPress={hideDialog}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default ConfirmDialog;
