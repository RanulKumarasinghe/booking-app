import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from 'src/navigators/TabNavigator'


export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}


