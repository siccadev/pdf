import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Message from "./screens/Message"
import pdfeditor from './screens/pdfeditor'
import PDFconvert from './screens/PDFconvert'
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="StartingPage" screenOptions={{ headerShown: false }}>
         <Stack.Screen name="PDFconvert" component={PDFconvert} /> 
        
      


       </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});