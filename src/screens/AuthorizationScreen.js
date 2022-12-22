import React from 'react';
import {CentralizedContainer} from '../styles';
import AuthForm from '../components/authorization/AuthForm';

const AuthorizationScreen = () => {
  return (
    <CentralizedContainer>
      <AuthForm />
    </CentralizedContainer>
  );
};

export default AuthorizationScreen;
