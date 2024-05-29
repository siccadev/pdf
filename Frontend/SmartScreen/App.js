import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./screens/Home"
import pdfScanner from "./screens/pdfScanner"
import Launch from "./screens/Launch "
import Help from "./screens/Help"
import Onbording from "./screens/Onbording"
import PdfEditor from './screens/PdfEditor';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartingPage" screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Launch" component={Launch} /> 
         <Stack.Screen name="Launch" component={Launch} /> 
         {/* <Stack.Screen name="Onbording" component={Onbording} />  */}
         {/* <Stack.Screen name="Home" component={Home} />  */}
         {/* <Stack.Screen name="Help" component={Help} />  */}
        <Stack.Screen name="Message" component={Message} /> 
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