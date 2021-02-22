import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

// import 
import {HomeNavigator, RestaurantNavigator} from '@/navigators/user/RestaurantsNavigator'
import BookingListScreen from 'src/scenes/bookings/BookingListScreen';
import AuthNavigator from 'src/navigators/AuthNavigator';

const Tab = createBottomTabNavigator();

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
      <Tab.Screen name='Home' component={HomeNavigator}
      options={({ route }) => ({
        tabBarVisible: getTabBarVisible(route, 'Restaurants') })} />
      <Tab.Screen 
        name="Restaurants" 
        component={RestaurantNavigator} 
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route, 'Restaurants') })} />
      <Tab.Screen name='Bookings' component={BookingListScreen}/>
      <Tab.Screen 
        name="User" 
        component={AuthNavigator} 
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route, 'Login') })} />
    </Tab.Navigator>
  );
}


const Navbar = ({ navigation, state }) => {
  return (
    <View>
      <React.Fragment>
        <BottomNavigation 
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
          <BottomNavigationTab 
            icon={(e) => (<Icon {...e} name='home-outline' />)} 
            title="Home" />
          <BottomNavigationTab 
            icon={(e) => (<Icon {...e} name='search-outline' />)} 
            title="Search" />
          <BottomNavigationTab 
            icon={(e) => (<Icon {...e} name='clipboard-outline' />)} 
            title="Bookings" />
          <BottomNavigationTab 
            icon={(e) => (<Icon {...e} name='person-outline' />)}
            title="User" />
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


export default TabNavigator