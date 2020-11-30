
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import RestaurantScreen from '../scenes/restaurants/RestaurantScreen';
import RestaurantListScreen from '../scenes/restaurants/RestaurantListScreen';
import BookingScreen from 'src/scenes/BookingScreen';
import BookingListScreen from 'src/scenes/BookingListScreen';

import RestaurantEditScreen from '../scenes/restaurants/RestaurantEditScreen';
import RewardScreen from '@/scenes/rewards/RewardScreen';


const Restaurant = createStackNavigator();

const HomeNavigator = () => (
  <Restaurant.Navigator 
    // headerMode='none' 
    initialRouteName="Restaurants">
    <Restaurant.Screen name='Reward' component={RewardScreen}/>
    <Restaurant.Screen name='Restaurants' component={RestaurantListScreen}/>
    <Restaurant.Screen name='Restaurant' component={RestaurantScreen}/>
    <Restaurant.Screen name='Edit Restaurant' component={RestaurantEditScreen}/>
    <Restaurant.Screen name='BookingListScreen' component={BookingListScreen}/>
    <Restaurant.Screen name='Booking' component={BookingScreen}/>
  </Restaurant.Navigator>
);

export default HomeNavigator;
