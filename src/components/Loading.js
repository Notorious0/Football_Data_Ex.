import { StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native'
import React from 'react'

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButtonContainer} onPress={() => props.changeIsLoading()}>
        <Text style={styles.closeButton}>X</Text>
      </Pressable>
      <ActivityIndicator size={'large'} color={'navy'} />
      <Text style={styles.loginText}>Loading...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'navy',
    marginTop: 20,
  },
  closeButtonContainer: {
    backgroundColor: 'navy',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
    right: 25,
  },
  closeButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  }
})
