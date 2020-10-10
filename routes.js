import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './components/Pages/Home';
import { LoginScreen } from './components/Pages/Login';
import { MenuScreen } from './components/Pages/Menu';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none' initialRouteName="Home">
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Login' component={LoginScreen}/>
    <Screen name='Menu' component={MenuScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);

