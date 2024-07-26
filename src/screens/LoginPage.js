import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'; 
import {Loading, CustomTextInput, CustomButton} from '../components';
import {login, setisLoading} from '../redux/userSlice'; 

const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {isLoading} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hoşgeldiniz</Text>

      <Image
        source={require('../../assets/icons/login.png')}
        style={styles.image}
      />

      <CustomTextInput
        title="Email"
        isSecureText={false}
        handleOnchangeText={(text) => setEmail(text.toLowerCase())}
        handleValue={email}
        handlePlaceholder="Email'inizi girin"
      />
      <CustomTextInput
        title="Şifre"
        isSecureText={true}
        handleOnchangeText={(password) => setPassword(password)}
        handleValue={password}
        handlePlaceholder="Şifrenizi girin"
      />
      

      <CustomButton
        buttonText="Giriş Yap"
        setwidth="80%"
        handleOnPress={() => dispatch(login({email, password}))}
        buttonColor="navy"
        pressedButtonColor="lightblue"
      />

      <CustomButton
        buttonText="Kayıt Ol"
        setwidth="30%"
        handleOnPress={() => navigation.navigate('Signup')}
        buttonColor="#ffd700"
        pressedButtonColor="lightblue"
      />

      <StatusBar style="auto" />
      {isLoading ? <Loading changeIsLoading={() => dispatch(setisLoading(false))} /> : null}
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87ceeb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
    color: 'white',
  },
});



