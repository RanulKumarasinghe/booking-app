import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, Button, TopNavigation, Layout, Divider } from '@ui-kitten/components';
import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux'

const HomeScreen = ({ navigation }) => {
  const restaurants = useSelector(state => state.restaurants);

  const test = () => {
    console.log(restaurants)
  }

  const navigateEditRestaurant = () => {
    navigation.navigate('RestaurantEdit');
  }

  const rewards = () => {
    navigation.navigate('RewardScreen');
  }


  return (
    <SafeAreaView style={{flex:1}}>
      <TopNavigation title={"Home"} alignment='center'/>
      <Layout style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={navigateEditRestaurant}>Edit</Button>
        <Divider/>
      </Layout>
      <Layout style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={rewards}>Rewards</Button>
      </Layout>
      <View>
        <Navbar selectedIndex={0} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
