import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {headerColor} from '../styles/Variables';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthorizationScreen from '../screens/AuthorizationScreen';
import {isLoggedIn} from '../services/isLoggedIn';
import CustomDrawerContent from './CustomDrawerContent';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
const Drawer = createDrawerNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            height: 60,
            backgroundColor: `${headerColor}`,
          },
          drawerActiveTintColor: '#F77F00',
          drawerLabelStyle: {fontSize: 20},
          drawerStyle: {backgroundColor: '#FFFFFF'},
          drawerItemStyle: {
            width: '90%',
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            drawerIcon: ({focused, size}) => (
              <Icon name="home" size={20} style={{}} color="black" />
            ),
          }}
        />

        {!isLoggedIn() ? (
          <Drawer.Screen
            name="Login"
            component={AuthorizationScreen}
            options={{
              title: 'Login',
              drawerIcon: ({focused, size}) => (
                <Icon name="login" size={20} style={{}} color="black" />
              ),
            }}
          />
        ) : (
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'Profile',
              drawerIcon: ({focused, size}) => (
                <Icon name="profile" size={20} style={{}} color="black" />
              ),
            }}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
