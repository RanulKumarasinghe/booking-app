import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from 'src/navigators/TabNavigator'
import ManagerTabNavigator from 'src/navigators/ManagerTabNavigator'
import { useSelector } from 'react-redux';


export const AppNavigator = () => {
  const isManager = useSelector(state => !!state.auth.uid);

  return (
    <NavigationContainer>
      {isManager && <ManagerTabNavigator />}
      {!isManager && <TabNavigator />}
    </NavigationContainer>
  );
}


