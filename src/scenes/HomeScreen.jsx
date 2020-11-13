import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux'

const HomeScreen = ({ navigation }) => {
  const restaurants = useSelector(state => state.restaurants);

  const test = () => {
    console.log(restaurants)
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <TopNavigation title={"Home"} alignment='center'/>
      <View style={{flex:1}}>
      </View>
      <View>
        <Navbar selectedIndex={0} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
