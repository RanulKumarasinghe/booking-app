
import React from 'react'

import RewardScreen from 'src/scenes/rewards/RewardScreen'
import HomeScreen from 'src/scenes/HomeScreen'
import RestaurantAddScreen from 'src/scenes/restaurants/RestaurantAddScreen';


import { createStackNavigator } from '@react-navigation/stack';

const HomeStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? 'black' : ''
  },
  // headerTitleStyle: {
  //   fontFamily: 'open-sans-bold'
  // },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : 'black'
};

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator
      initialRouteName="Rewards"
      screenOptions={defaultNavOptions}>
      <HomeStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        // options={authScreenOptions}
      />
      <HomeStackNavigator.Screen
        name="Rewards"
        component={RewardScreen}
        // options={authScreenOptions}
      />

      <HomeStackNavigator.Screen
      name='Add Restaurant'
      component={RestaurantAddScreen}
      />

    </HomeStackNavigator.Navigator>
  );
};

export default HomeNavigator;
