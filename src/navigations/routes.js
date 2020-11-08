import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../scenes/HomeScreen';
import LoginScreen from '../scenes/LoginScreen';
import SignUpScreen from '../scenes/SignUpScreen';
import LoadingScreen from '../scenes/LoadingScreen';

import MenuScreen from '../components/Menu';
import RestaurantScreen from '../scenes/RestaurantScreen';
import RestaurantListScreen from '../scenes/RestaurantListScreen';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none' initialRouteName="Home">
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Loading' component={LoadingScreen}/>
    <Screen name='Login' component={LoginScreen}/>
    <Screen name='SignUp' component={SignUpScreen}/>
    <Screen name='Restaurant' component={RestaurantScreen}/>
    <Screen name='RestaurantList' component={RestaurantListScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);

