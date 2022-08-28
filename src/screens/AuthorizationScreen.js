import {StyleSheet, Text, ImageBackground} from 'react-native';
import React from 'react';
import {CentralizedContainer} from '../styles';
import AuthForm from '../components/authorization/AuthForm';
const AuthorizationScreen = () => {
  return (
    <CentralizedContainer>
      {/* <ImageBackground>
          source={require("../../assets/bgauth.png")}
          resizeMode="cover" style=
          {{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        </ImageBackground> */}
      <AuthForm />
    </CentralizedContainer>
  );
};

export default AuthorizationScreen;

const styles = StyleSheet.create({});
