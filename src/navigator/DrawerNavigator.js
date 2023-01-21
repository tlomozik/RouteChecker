import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {headerColor} from '../styles/Variables';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthorizationScreen from '../screens/AuthorizationScreen';
import {isLoggedIn} from '../services/Authentication/isLoggedIn';
import CustomDrawerContent from './CustomDrawerContent';
import Icon from 'react-native-vector-icons/AntDesign';
import {isAccellEmpty} from '../services/Accelerometer/isAccelEmpty';
import * as React from 'react';
import ChartScreen from '../screens/ChartScreen';
import RoadGapsScreen from '../screens/RoadGapsScreen';
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
          name="AnalizaTrasy"
          component={HomeScreen}
          options={{
            title: 'Analiza Trasy',
            drawerIcon: ({focused, size}) => (
              <Icon name="home" size={20} style={{}} color="black" />
            ),
          }}
        />

        {!isAccellEmpty() ? (
          <Drawer.Screen
            name="Charts"
            component={ChartScreen}
            options={{
              title: 'Charts',
              drawerIcon: ({focused, size}) => (
                <Icon name="linechart" size={20} style={{}} color="black" />
              ),
            }}
          />
        ) : null}
        <Drawer.Screen
          name="Przeglądaj"
          component={RoadGapsScreen}
          options={{
            title: 'Przeglądaj',
            drawerIcon: ({focused, size}) => (
              <Icon name="warning" size={20} style={{}} color="black" />
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
          <>
            <Drawer.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                title: 'Profil',
                drawerIcon: ({focused, size}) => (
                  <Icon name="profile" size={20} style={{}} color="black" />
                ),
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
