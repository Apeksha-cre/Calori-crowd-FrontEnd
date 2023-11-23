// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './components/WelcomeScreen';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import SearchByName from './components/SearchByName';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name='SearchByName' component={SearchByName}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;