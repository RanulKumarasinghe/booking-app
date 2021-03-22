
import React from 'react'

import ProfileScreen from 'src/scenes/ProfileScreen'
import RestaurantAddScreen from 'src/scenes/restaurants/RestaurantAddScreen';
import AddTableScreen from 'src/scenes/bookings/AddTableScreen';
import EditRestaurant from '@/scenes/manager/RestaurantEditScreen'
import ListMenu from '@/scenes/restaurants/RestaurantListMenuScreen'
import AddMenuItem from '@/scenes/manager/AddMenuItemScreen'
import ManagerRewards from '@/scenes/rewards/ManagerRewardScreen'
import Rewards from '@/scenes/rewards/RewardScreen'
import RestaurantEditMenuScreen from '@/scenes/manager/EditMenuItemScreen';
import ChangePasswordScreen from '@/scenes/auth/ChangePasswordScreen';
import ChangeNameScreen from '@/scenes/auth/ChangeNameScreen';
import  ChangeUserSettingsScreen from '@/scenes/ChangeUserSettingsScreen'
import { createStackNavigator } from '@react-navigation/stack';
import QRCodeScannerScreen from '@/scenes/rewards/QRCodeScannerScreen';
import GenerateQRCodeScreen from '@/scenes/rewards/GenerateQRCodeScreen';


const ProfileStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? 'black' : ''
  },
  // headerTitleStyle: {
  //   fontFamily: 'open-sans-bold'
  // },
  // headerBackTitleStyle: {
  //   fontFamily: 'open-sans'
  // },
  headerTintColor: Platform.OS === 'android' ? 'white' : 'black'
};

const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfileStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='Add Restaurant'
        component={RestaurantAddScreen}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='Add Table'
        component={AddTableScreen}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='Edit Restaurant'
        component={EditRestaurant}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='Edit Menu'
        component={ListMenu}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='Add Menu Item'
        component={AddMenuItem}
      // options={authScreenOptions}
      />
       <ProfileStackNavigator.Screen
        name='EditMenuScreen'
        component={RestaurantEditMenuScreen}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='Create Rewards'
        component={ManagerRewards}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='Rewards'
        component={Rewards}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='Change Password'
        component={ChangePasswordScreen}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='Change Name'
        component={ChangeNameScreen}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='Change User Settings'
        component={ChangeUserSettingsScreen}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='QR Scanner'
        component={QRCodeScannerScreen}
      // options={authScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name='Generate QR Code'
        component={GenerateQRCodeScreen}
      // options={authScreenOptions}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileNavigator;
