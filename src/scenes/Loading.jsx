// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native';
import Navbar from '../components/Navbar';

class LoadingScreen extends React.Component {
  
  navigateBack = () => {
    this.navigation.goBack();
  };
  
  BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={this.navigateBack} />
  );
  
  render({navigation}){
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text>Loading...</Text>
          </View>
          <View>
            <Navbar selectedIndex={1} navigation={navigation} />
          </View>
        </SafeAreaView>
      );
  }
  
  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })
}


export default LoadingScreen;