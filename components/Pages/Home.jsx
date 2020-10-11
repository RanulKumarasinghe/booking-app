import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

export const HomeScreen = ({ navigation }) => {

  const navigateMenu = () => {
    navigation.navigate('Menu');
  };

  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  const navigateRestaurants = () => {
    navigation.navigate('Restaurants');
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Home' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateMenu}>Open Menu</Button>
        <Divider/>
        <Button onPress={navigateLogin}>Login</Button>
        <Divider/>
        <Button onPress={navigateRestaurants}>Restaurants</Button>
      </Layout>
    </SafeAreaView>
  );
};