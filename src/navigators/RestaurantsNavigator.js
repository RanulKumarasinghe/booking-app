
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import RestaurantScreen from '../scenes/restaurants/RestaurantScreen';
import RestaurantListScreen from '../scenes/restaurants/RestaurantListScreen';
import ReservationPage from '../scenes/ReservationPage';
import BookingScreen from '../scenes/BookingScreen';
import RestaurantEditScreen from '../scenes/restaurants/RestaurantEditScreen';
import RewardScreen from '@/scenes/rewards/RewardScreen';


const Restaurant = createStackNavigator();

const HomeNavigator = () => (
  <Restaurant.Navigator headerMode='none' initialRouteName="Restaurants">
    <Restaurant.Screen name='Restaurants' component={RestaurantListScreen}/>
    <Restaurant.Screen name='Restaurant' component={RestaurantScreen}/>
    <Restaurant.Screen name='Edit Restaurant' component={RestaurantEditScreen}/>
    <Restaurant.Screen name='Reservation' component={ReservationPage}/>
  </Restaurant.Navigator>
);

export default HomeNavigator;