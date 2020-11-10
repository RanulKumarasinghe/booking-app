import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import Navbar from '@/components/Navbar';

const HomeScreen = ({ navigation }) => {
  
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1}}>
        <Text>asdasd</Text>
      </View>
      <View>
        <Navbar selectedIndex={0} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;