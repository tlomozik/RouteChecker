import {StyleSheet, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import React from 'react';
const ProfileIcon = () => {
  const {user} = useSelector(state => state.user);

  return (
    <>
      <Image
        source={require('../../../assets/profile-icon.png')}
        style={{
          width: 100,
          height: 100,
          resizeMode: 'contain',
        }}
      />
      <Text style={{fontWeight: 'bold', color: 'black'}}>
        {user.displayName}
      </Text>
    </>
  );
};

export default ProfileIcon;
