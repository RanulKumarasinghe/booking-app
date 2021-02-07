
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import RestaurantScreen from '../scenes/restaurants/RestaurantScreen';
import RestaurantListScreen from '../scenes/restaurants/RestaurantListScreen';
import BookingScreen from 'src/scenes/bookings/BookingScreen';
import BookingListScreen from 'src/scenes/bookings/BookingListScreen';

import RestaurantEditScreen from '../scenes/restaurants/RestaurantEditScreen';
import RestaurantAddScreen from '../scenes/restaurants/RestaurantAddScreen';
import RewardScreen from '@/scenes/rewards/RewardScreen';

import CheckOutScreen from '@/scenes/order/CheckOutScreen'
import MenuScreen from '@/scenes/order/MenuScreen'
import OrderTypeScreen from '@/scenes/order/OrderTypeScreen'
import RestaurantEditMenuScreen from '@/scenes/order/RestaurantEditMenuScreen'
import MenuItemScreen from '@/scenes/order/MenuItemScreen'

const Restaurant = createStackNavigator();

const HomeNavigator = () => (
  <Restaurant.Navigator
    // headerMode='none'
    initialRouteName="Restaurants">

    <Restaurant.Screen name='Reward' component={RewardScreen}/>
    <Restaurant.Screen name='Restaurants' component={RestaurantListScreen}/>
    <Restaurant.Screen name='Restaurant' component={RestaurantScreen}/>
    <Restaurant.Screen name='Edit Restaurant' component={RestaurantEditScreen}/>
    <Restaurant.Screen name='Add Restaurant' component={RestaurantAddScreen}/>
    <Restaurant.Screen name='BookingListScreen' component={BookingListScreen}/>
    <Restaurant.Screen name='Booking' component={BookingScreen}/>
    <Restaurant.Screen name='EditMenuScreen' component={RestaurantEditMenuScreen}/>

    {/* Order */}
    <Restaurant.Screen name='Checkout' component={CheckOutScreen}/>
    <Restaurant.Screen name='Menu Item' component={MenuItemScreen}/>
    <Restaurant.Screen name='Menu' component={MenuScreen}/>
    <Restaurant.Screen name='Order Type' component={OrderTypeScreen}/>
  </Restaurant.Navigator>
);

export default HomeNavigator;
