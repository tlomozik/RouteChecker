/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import DrawerNavigator from './src/navigator/DrawerNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {LogBox} from 'react-native';
const App = () => {
  return (
    <Provider store={store}>
      <DrawerNavigator />
    </Provider>
  );
};

export default App;
