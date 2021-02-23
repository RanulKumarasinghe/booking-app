
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../scenes/HomeScreen';

import RestaurantScreen from '../../scenes/RestaurantScreen';
import RestaurantListScreen from '../../scenes/restaurants/RestaurantListScreen';
import BookingScreen from 'src/scenes/bookings/BookingScreen';
import BookingListScreen from 'src/scenes/bookings/BookingListScreen';
import PendingBookingScreen from 'src/scenes/bookings/PendingBookingScreen';
import RestaurantMenuListScreen from '../../scenes/restaurants/RestaurantListMenuScreen';

import RestaurantEditScreen from '../../scenes/restaurants/RestaurantEditScreen';
import RestaurantAddScreen from '../../scenes/restaurants/RestaurantAddScreen';
import RewardScreen from '@/scenes/rewards/RewardScreen';

import CheckOutScreen from '@/scenes/order/CheckOutScreen';
import MenuScreen from '@/scenes/order/MenuScreen';
import OrderTypeScreen from '@/scenes/order/OrderTypeScreen';
import RestaurantEditMenuScreen from '@/scenes/manager/EditMenuItemScreen';
import MenuItemScreen from '@/scenes/order/MenuItemScreen';
import MenuAddItem from '@/scenes/manager/AddMenuItemScreen';


const routes = (Screen) => (      
  <>
    <Screen name='Home' component={HomeScreen}/>

    <Screen name='Reward' component={RewardScreen}/>
    <Screen name='Restaurants' component={RestaurantListScreen}/>
    <Screen name='Restaurant' component={RestaurantScreen}/>
    <Screen name='Edit Restaurant' component={RestaurantEditScreen}/>
    <Screen name='Add Restaurant' component={RestaurantAddScreen}/>
    <Screen name='BookingListScreen' component={BookingListScreen}/>
    <Screen name='Booking' component={BookingScreen}/>
    <Screen name='EditMenuScreen' component={RestaurantEditMenuScreen}/>
    {/* <Screen name='MenuList' component={RestaurantMenuListScreen}/> */}


    {/* Order */}
    <Screen name='Checkout' component={CheckOutScreen}/>
    <Screen name='Menu Item' component={MenuItemScreen}/>
    <Screen name='Menu' component={MenuScreen}/>
    <Screen name='Order Type' component={OrderTypeScreen}/>
    <Screen name='Add Item' component={MenuAddItem}/>


    <Screen name='Bookings Pending' component={PendingBookingScreen}/>
  </>
  )

const Home = createStackNavigator();
const HomeNavigator = () => (
  <Home.Navigator
    initialRouteName={ "Home"}>
      {routes(Home.Screen)}
  </Home.Navigator>
);

const Restaurant = createStackNavigator();
const RestaurantNavigator = () => (
  <Restaurant.Navigator
    initialRouteName={ "Restaurants"}>
      {routes(Restaurant.Screen)}
  </Restaurant.Navigator>
);


export {HomeNavigator, RestaurantNavigator} ;
