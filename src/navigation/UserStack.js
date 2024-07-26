import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HomePage,Profilepage } from '../screens'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack=createNativeStackNavigator();

const UserStack = () => {
  return (
   <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
    <Stack.Screen name='Home' component={HomePage}/>
    <Stack.Screen name='Profile' component={Profilepage}/>

   </Stack.Navigator>
  )
}

export default UserStack

const styles = StyleSheet.create({})
