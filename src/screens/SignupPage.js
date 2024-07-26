import { StyleSheet, Text, View, Image, Pressable, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import { CustomTextInput, CustomButton, Loading } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/userSlice';

const SignupPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.user);

  const handleRegister = () => {
    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        navigation.navigate('HomePage'); // Kayıt başarılı olunca HomePage'e yönlendir
      })
      .catch(error => {
        console.error("Registration error: ", error);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.title}>
          <Image style={styles.image} source={require('../../assets/icons/signup.png')} />
          <Text style={styles.signUp}>Signup</Text>
        </View>

        <View style={styles.textInputContainer}>
          <CustomTextInput
            title="Name :"
            isSecureText={false}
            handleOnchangeText={setName}
            handleValue={name}
            handlePlaceholder="Enter Your Name"
          />

          <CustomTextInput
            title="Email :"
            isSecureText={false}
            handleOnchangeText={setEmail}
            handleValue={email}
            handlePlaceholder="Enter Your Email"
          />

          <CustomTextInput
            title="Password :"
            isSecureText={true}
            handleOnchangeText={setPassword}
            handleValue={password}
            handlePlaceholder="Enter Your Password"
          />
        </View>

        <View style={styles.signupOption}>
          <CustomButton
            buttonText='Signup'
            setwidth='80%'
            handleOnPress={handleRegister}
            buttonColor="navy"
            pressedButtonColor="lightblue"
          />
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontWeight: 'bold' }}>Already have an account? Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87ceeb',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUp: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
    color: 'white',
  },
  title: {
    flex: 1.5,
    alignItems: 'center', // Center align title content
  },
  textInputContainer: {
    flex: 2.5,
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  signupOption: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20 // Add padding to avoid button being covered by keyboard
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

