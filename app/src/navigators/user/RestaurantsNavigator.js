
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@/scenes/HomeScreen';

import RestaurantScreen from '@/scenes/RestaurantScreen';
import RestaurantListScreen from '@/scenes/restaurants/RestaurantListScreen';
import BookingScreen from '@/scenes/bookings/BookingScreen';
import BookingListScreen from '@/scenes/bookings/BookingListScreen';
import RestaurantMenuListScreen from '@/scenes/restaurants/RestaurantListMenuScreen';

import RestaurantEditScreen from '@/scenes/restaurants/RestaurantEditScreen';
import RestaurantAddScreen from '@/scenes/restaurants/RestaurantAddScreen';
import RewardScreen from '@/scenes/rewards/RewardScreen';

import CheckOutScreen from '@/scenes/order/CheckOutScreen';
import MenuScreen from '@/scenes/order/MenuScreen';
import OrderTypeScreen from '@/scenes/order/OrderTypeScreen';
import RestaurantEditMenuScreen from '@/scenes/manager/EditMenuItemScreen';
import MenuItemScreen from '@/scenes/order/MenuItemScreen';
import MenuAddItem from '@/scenes/manager/AddMenuItemScreen';

// TODO: TO BE DELETED - Temporarry  
import AddTableScreen from '@/scenes/bookings/AddTableScreen'
import ManagerRewardScreen from '@/scenes/rewards/ManagerRewardScreen'

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

    {/* TODO: TO BE DELETED - Temporarry  */}
    <Screen name="AddTableScreen" component={AddTableScreen} />
    <Screen name="Rewards" component={RewardScreen} />
    <Screen name="ManagerRewards" component={ManagerRewardScreen} />
  </>
  )

const Home = createStackNavigator();
const HomeNavigator = () => (
  <Home.Navigator
    initialRouteName="Home">
      {routes(Home.Screen)}
  </Home.Navigator>
);

const Restaurant = createStackNavigator();
const RestaurantNavigator = () => (
  <Restaurant.Navigator
    initialRouteName="Restaurants">
      {routes(Restaurant.Screen)}
  </Restaurant.Navigator>
);


export {HomeNavigator, RestaurantNavigator} ;
