import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../scenes/HomeScreen';
import LoginScreen from '../scenes/LoginScreen';
import SignUpScreen from '../scenes/SignUpScreen';
import RestaurantScreen from '../scenes/RestaurantScreen';
import RestaurantListScreen from '../scenes/RestaurantListScreen';
import ReservationPage from '../scenes/ReservationPage';
import BookingScreen from '../scenes/BookingScreen';
import RestaurantEditScreen from '../scenes/RestaurantEditScreen';
import RewardScreen from '@/scenes/RewardScreen';


const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none' initialRouteName="Home">
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Login' component={LoginScreen}/>
    <Screen name='SignUp' component={SignUpScreen}/>
    <Screen name='Restaurant' component={RestaurantScreen}/>
    <Screen name='RestaurantList' component={RestaurantListScreen}/>
    <Screen name='RestaurantEdit' component={RestaurantEditScreen}/>
    <Screen name='ReservationPage' component={ReservationPage}/>
    <Screen name='Booking' component={BookingScreen}/>
    <Screen name='RewardScreen' component={RewardScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);

