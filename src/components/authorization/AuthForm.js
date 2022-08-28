import {
  StyledTextInput,
  AuthorizationButton,
  AuthorizationForm,
  StyledButtonText,
} from '../../styles';
import {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import signup from '../../services/signup';
import signin from '../../services/signin';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const AuthForm = () => {
  const handleSignUp = () => {
    if (password === checkPass) {
      signup({email, password, name, navigation, dispatch});
    } else console.log('Złe hasło');
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [name, setName] = useState('');
  const [togglePassHide, setTogglePassHide] = useState(true);

  const [type, setType] = useState(true);

  return (
    <AuthorizationForm>
      <StyledTextInput
        selectionColor="#F77F00"
        label="Email"
        mode="outlined"
        activeOutlineColor="#F77F00"
        onChangeText={text => setEmail(text)}
      />
      <StyledTextInput
        selectionColor="#F77F00"
        label="Hasło"
        mode="outlined"
        activeOutlineColor="#F77F00"
        onChangeText={text => setPassword(text)}
        secureTextEntry={togglePassHide}
        right={
          <StyledTextInput.Icon
            style={{marginTop: 12}}
            icon="eye"
            onPress={() =>
              setTogglePassHide(prevTogglePassHide => !prevTogglePassHide)
            }
          />
        }
      />
      {type ? (
        ///////////////// Rejestracja
        <>
          <StyledTextInput
            selectionColor="#F77F00"
            label="Potwierdź hasło"
            mode="outlined"
            activeOutlineColor="#F77F00"
            onChangeText={text => setCheckPass(text)}
            secureTextEntry={togglePassHide}
          />

          <StyledTextInput
            selectionColor="#F77F00"
            label="Imię"
            mode="outlined"
            activeOutlineColor="#F77F00"
            onChangeText={text => setName(text)}
          />
          <AuthorizationButton
            icon="account-edit"
            mode="contained"
            labelStyle={{color: 'black'}}
            onPress={() => {
              handleSignUp();
            }}>
            <StyledButtonText> Zarejestruj się</StyledButtonText>
          </AuthorizationButton>
          <AuthorizationButton
            icon="google"
            mode="contained"
            labelStyle={{color: 'black'}}
            onPress={() => console.log('Google Pressed')}>
            <StyledButtonText> Zarejestruj się z Google</StyledButtonText>
          </AuthorizationButton>

          <TouchableOpacity
            style={{marginTop: 30}}
            onPress={() => setType(prevType => !prevType)}>
            <Text>Posiadasz już konto? Zaloguj się</Text>
          </TouchableOpacity>
        </>
      ) : (
        ///////////////////
        <>
          <AuthorizationButton
            icon="account-edit"
            mode="contained"
            labelStyle={{color: 'black'}}
            onPress={() => {
              signin({email, password, navigation, dispatch});
            }}>
            <StyledButtonText> Zaloguj się</StyledButtonText>
          </AuthorizationButton>
          <AuthorizationButton
            icon="google"
            mode="contained"
            labelStyle={{color: 'black'}}
            onPress={() => console.log('Google Pressed')}>
            <StyledButtonText> Zaloguj się z Google</StyledButtonText>
          </AuthorizationButton>

          <TouchableOpacity
            style={{marginTop: 30}}
            onPress={() => setType(prevType => !prevType)}>
            <Text>Nie posiadasz konta? Zarejestruj się</Text>
          </TouchableOpacity>
        </>
      )}
    </AuthorizationForm>
  );
};

export default AuthForm;
