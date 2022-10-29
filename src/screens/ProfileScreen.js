import {StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import ProfileIcon from '../components/navigation/ProfileIcon';
import {GlobalContainer} from '../styles';
import {useSelector} from 'react-redux';

const ProfileScreen = () => {
  const {user} = useSelector(state => state.user);

  return (
    <GlobalContainer>
      <ProfileIcon />
      <Text style={{fontWeight: '800', color: 'black'}}>{user.email}</Text>
    </GlobalContainer>
  );
};

export default ProfileScreen;
