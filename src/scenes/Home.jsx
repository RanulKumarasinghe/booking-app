import React from 'react';
import { SafeAreaView } from 'react-native';
import {Text ,Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import MenuScreen from '../scenes/Menu'

const HomeScreen = ({ navigation }) => {

  const navigateMenu = () => {
    navigation.navigate('Menu');
  };

  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  };
  
  const navigateLoading = () => {
    navigation.navigate('Loading');
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
        <Button onPress={navigateLoading}>Loading</Button>
        <Divider/>
        <Button onPress={navigateSignUp}>SignUp</Button>
        <Divider/>
        <Button onPress={navigateLogin}>Login</Button>
        <Divider/>
        <Button onPress={navigateRestaurants}>Restaurants</Button>
        <Divider/>
        <Button onPress={navigateRestaurantList}>Restaurant List</Button>
      </Layout>
      <MenuScreen />
    </SafeAreaView>
  );
};

export default HomeScreen;
