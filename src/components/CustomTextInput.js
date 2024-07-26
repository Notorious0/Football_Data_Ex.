import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const CustomTextInput = ({title,isSecureText,handleOnchangeText,handleValue,handlePlaceholder}) => {
  return (
    <View>
        <View style={styles.inputContainer}>
      <Text style={styles.inputBoxText}>{title}</Text>
      <TextInput
      secureTextEntry={isSecureText}
        placeholder={handlePlaceholder}
        style={styles.textInputStyle}
        onChangeText={handleOnchangeText}
        value={handleValue}
      />
      </View>
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    inputContainer:{
        width:'%80',
      },
      inputBoxText:{
        fontWeight:'bold',
        alignSelf:'flex-start',
        color:'white',
      },
      textInputStyle: {
        borderBottomWidth:1,
        borderColor:'white',
        width: '100%',
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        textAlign: 'center',
        color: 'navy',
        fontWeight: 'bold',
        color:'white',
      },
})