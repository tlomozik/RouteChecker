import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProfileIcon from '../components/navigation/ProfileIcon';
import {GlobalContainer} from '../styles';
import {useSelector} from 'react-redux';
const ProfileScreen = () => {
  const {user} = useSelector(state => state.user);
  console.log(user.email);

  return (
    <GlobalContainer>
      <ProfileIcon />

      <Text style={{fontWeight: '800', color: 'black'}}>{user.email}</Text>
    </GlobalContainer>
  );
};

export default ProfileScreen;
