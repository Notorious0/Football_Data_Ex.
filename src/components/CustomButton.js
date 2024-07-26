import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';

const CustomButton = ({ buttonText, setwidth, handleOnPress, buttonColor, pressedButtonColor }) => {
  return (
    <Pressable
      onPress={handleOnPress}
      style={({ pressed }) => [{
        backgroundColor: pressed ? pressedButtonColor : buttonColor,
        width: setwidth,
      }, styles.button]}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    button: {
      borderWidth: 1,
      width: '70%',
      height: 50,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      marginTop: 20,
    },
    buttonText: {
      fontWeight: 'bold',
      color: 'white',
    },
  });

export default CustomButton;
