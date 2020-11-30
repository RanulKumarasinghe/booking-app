import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

import HomeScreen from 'src/scenes/HomeScreen'
// import 
import RestaurantsNavigator from 'src/navigators/RestaurantsNavigator'
import BookingScreen from 'src/scenes/BookingScreen';
import AuthNavigator from 'src/navigators/AuthNavigator';

const Tab = createBottomTabNavigator();


const Navbar = ({ navigation, state }) => {
  return (
    <View>
      <React.Fragment>
        <BottomNavigation 
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>

          <BottomNavigationTab icon={(e) => (<Icon {...e} name='home-outline' />)} />
          <BottomNavigationTab icon={(e) => (<Icon {...e} name='search-outline' />)} />
          <BottomNavigationTab icon={(e) => (<Icon {...e} name='clipboard-outline' />)} />
          <BottomNavigationTab icon={(e) => (<Icon {...e} name='person-outline' />)} />
        </BottomNavigation>
      </React.Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'relative',
    bottom: 0,
    left: 0
  },
});



const TabNavigator = (props) => {
  //Hide tab navigation is outside products page
  const getTabBarVisible = (route, routeName) => {
    if (getFocusedRouteNameFromRoute(route) === routeName) {
      return true;
    }
    return false;
  }

  return (
    <Tab.Navigator tabBar={props => <Navbar {...props} />}>
      <Tab.Screen name='Home' component={HomeScreen}/>
      <Tab.Screen 
        name="Restaurants" 
        component={RestaurantsNavigator} 
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route, 'Restaurants') })} />
      <Tab.Screen name='Bookings' component={BookingScreen}/>
      <Tab.Screen 
        name="User" 
        component={AuthNavigator} 
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route, 'Login') })} />
    </Tab.Navigator>
  );
}

export default TabNavigator