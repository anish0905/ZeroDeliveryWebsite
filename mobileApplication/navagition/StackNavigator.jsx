import { StyleSheet} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../Screen/HomeScreen';
import Login from '../Screen/Login';



const Stack = createNativeStackNavigator();
    
export default function StackNavigator() {

   
  return (
    <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />

    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
    
  </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})