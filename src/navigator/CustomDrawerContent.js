import {View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {isLoggedIn} from '../services/Authentication/isLoggedIn';
import SignOutButton from '../components/navigation/SignOutButton';
import ProfileIcon from '../components/navigation/ProfileIcon';

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
      }}>
      <ProfileIcon />
      <DrawerItemList {...props} />
      <View
        style={{
          width: '90%',
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        {isLoggedIn() ? <SignOutButton /> : null}
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
