import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../scenes/Home';
import LoginScreen from '../scenes/Login';
import SignUpScreen from '../scenes/SignUp';
import LoadingScreen from '../scenes/Loading';

import MenuScreen from '../scenes/Menu';
import RestaurantScreen from '../scenes/Restaurant';
import RestaurantListScreen from '../scenes/RestaurantListScreen';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none' initialRouteName="Home">
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Loading' component={LoadingScreen}/>
    <Screen name='Login' component={LoginScreen}/>
    <Screen name='SignUp' component={SignUpScreen}/>
    <Screen name='Menu' component={MenuScreen}/>
    <Screen name='Restaurant' component={RestaurantScreen}/>
    <Screen name='RestaurantList' component={RestaurantListScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);

