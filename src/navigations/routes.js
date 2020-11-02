import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../scenes/Home';
import LoginScreen from '../scenes/Login';
import MenuScreen from '../scenes/Menu';
import Restaurant from '../scenes/Restaurant';
import RestaurantList from '../scenes/RestaurantList';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none' initialRouteName="Home">
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Login' component={LoginScreen}/>
    <Screen name='Menu' component={MenuScreen}/>
    <Screen name='Restaurant' component={Restaurant}/>
    <Screen name='RestaurantList' component={RestaurantList}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);

