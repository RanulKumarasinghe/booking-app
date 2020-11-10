import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
import Navbar from '@/components/Navbar';

const HomeScreen = ({ navigation }) => {
  
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
