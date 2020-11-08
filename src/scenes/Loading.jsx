// Loading.js
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native';
import { Divider, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import Navbar from '../components/Navbar';

const LoadingScreen = ({navigation}) => {

  navigateBack = () => {
    navigation.goBack();
  };
  
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );
  
  BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );


    return (
      <SafeAreaView style={{ flex: 1 }}>
         <TopNavigation title='Placeholder page' alignment='center' accessoryLeft={BackAction} />
        <Divider />
        <View style={{ flex: 1 }}>
          <Text style={{marginTop:20}}>Loading Page</Text>
        </View>
        <View>
          <Navbar selectedIndex={1} navigation={navigation} />
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default LoadingScreen;