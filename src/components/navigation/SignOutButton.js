import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import signout from '../../services/signout';
import {useDispatch} from 'react-redux';
import {StyledButtonText} from '../../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const SignOutButton = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => signout({dispatch})}>
      <View
        style={{
          backgroundColor: '#F77F00',
          borderRadius: 15,
          marginBottom: 20,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name="logout"
          size={20}
          style={{marginRight: 100}}
          color="black"
        />
        <StyledButtonText style={{position: 'absolute'}}>
          Wyloguj
        </StyledButtonText>
      </View>
    </TouchableOpacity>
  );
};

export default SignOutButton;
