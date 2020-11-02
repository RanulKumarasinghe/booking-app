import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/scenes/Home';
import LoginScreen from './src/scenes/Login';
import MenuScreen from './src/scenes/Menu';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none' initialRouteName="Home">
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Login' component={LoginScreen}/>
    <Screen name='Menu' component={MenuScreen}/>
    <Screen name='Restaurants' component={MenuScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);

