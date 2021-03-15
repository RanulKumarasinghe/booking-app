
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import RestaurantScreen from '@/scenes/RestaurantScreen';
import RestaurantListScreen from '@/scenes/restaurants/RestaurantListScreen';
import BookingScreen from '@/scenes/bookings/BookingScreen';
import BookingListScreen from '@/scenes/bookings/BookingListScreen';
import RestaurantListMenuScreen from '@/scenes/restaurants/RestaurantListMenuScreen';

import RestaurantAddScreen from '@/scenes/restaurants/RestaurantAddScreen';

import CheckOutScreen from '@/scenes/order/CheckOutScreen';
import MenuScreen from '@/scenes/order/MenuScreen';
import OrderTypeScreen from '@/scenes/order/OrderTypeScreen';
import RestaurantEditMenuScreen from '@/scenes/manager/EditMenuItemScreen';
import MenuItemScreen from '@/scenes/order/MenuItemScreen';
import MenuAddItem from '@/scenes/manager/AddMenuItemScreen';
import OrderCompletedScreen from '@/scenes/order/OrderCompleteScreen'

const routes = (Screen) => (
  <>
    <Screen name='Restaurants' component={RestaurantListScreen}/>
    <Screen name='Restaurant' component={RestaurantScreen}/>
    <Screen name='Add Restaurant' component={RestaurantAddScreen}/>
    <Screen name='BookingListScreen' component={BookingListScreen}/>
    <Screen name='Booking' component={BookingScreen}/>
    <Screen name='EditMenuScreen' component={RestaurantEditMenuScreen}/>
    <Screen name='MenuList' component={RestaurantListMenuScreen}/>

    {/* Order */}
    <Screen name='Order Completed' component={OrderCompletedScreen}/>
    <Screen name='Checkout' component={CheckOutScreen}/>
    <Screen name='Menu Item' component={MenuItemScreen}/>
    <Screen name='Menu' component={MenuScreen}/>
    <Screen name='Order Type' component={OrderTypeScreen}/>
    <Screen name='Add Item' component={MenuAddItem}/>
  </>
  )



const Restaurant = createStackNavigator();
const RestaurantNavigator = () => (
  <Restaurant.Navigator
    initialRouteName="Restaurants">
      {routes(Restaurant.Screen)}
  </Restaurant.Navigator>
);


export {RestaurantNavigator} ;
