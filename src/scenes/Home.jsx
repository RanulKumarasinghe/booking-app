import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

const HomeScreen = ({ navigation }) => {

  const navigateMenu = () => {
    navigation.navigate('Menu');
  };

  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  const navigateRestaurants = () => {
    navigation.navigate('Restaurant');
  };

  const navigateRestaurantList = () => {
    navigation.navigate('RestaurantList');
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
        <Divider/>
        <Button onPress={navigateRestaurantList}>Restaurant List</Button>
      </Layout>
    </SafeAreaView>
  );
};

export default HomeScreen;
