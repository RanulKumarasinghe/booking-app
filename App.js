import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Pages/Home'


const Stack = createStackNavigator();

//The stack navigator defaults to home.jsx file which uses also Kitten-UI
//The screen that was navigated to (home.jsx) gets passed a parameter (navigator)
//To use stack navigator and go to any other screen use this parameter
//For example to go to login page use navigator.navigate('Name of screen')
//Screen names can be seen in Stack.screen 'name' tag
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{title:'Home'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
