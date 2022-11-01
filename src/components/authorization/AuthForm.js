import {
  StyledTextInput,
  AuthorizationButton,
  AuthorizationForm,
  StyledButtonText,
} from '../../styles';
import {useState, useCallback} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import signup from '../../services/Authentication/signup';
import signin from '../../services/Authentication/signin';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {FadeIn} from 'react-native-reanimated';
import {ADD_USER} from '../../redux/slices/authSlice';
const AuthForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const callback = useCallback(user => {
    dispatch(ADD_USER(user)), navigation.navigate('Home');
  });

  const [checkPass, setCheckPass] = useState('');
  const [user, setUser] = useState({email: '', password: null, name: ''});
  const [togglePassHide, setTogglePassHide] = useState(true);
  const [type, setType] = useState(true);

  const handleSignUp = () => {
    console.log(user.password);
    if (user.password === checkPass) {
      signup(user, callback);
    } else console.log('Złe hasło');
  };

  return (
    <AuthorizationForm entering={FadeIn.duration(1000)}>
      <StyledTextInput
        selectionColor="#F77F00"
        label="Email"
        mode="outlined"
        activeOutlineColor="#F77F00"
        onChangeText={text => setUser({...user, email: text})}
      />
      <StyledTextInput
        selectionColor="#F77F00"
        label="Hasło"
        mode="outlined"
        activeOutlineColor="#F77F00"
        onChangeText={text => setUser({...user, password: text})}
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
            onChangeText={text => setUser({...user, name: text})}
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
            style={{
              marginTop: 25,
            }}
            onPress={() => setType(prevType => !prevType)}>
            <Text style={{color: 'black'}}>
              Posiadasz już konto? Zaloguj się
            </Text>
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
              signin(user, callback);
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
            <Text style={{color: 'black'}}>
              Nie posiadasz konta? Zarejestruj się
            </Text>
          </TouchableOpacity>
        </>
      )}
    </AuthorizationForm>
  );
};

export default AuthForm;
