import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import List from './components/List';

import Login from './components/Pages/Login'
import Menu from './components/Pages/Menu'
import Restaurant from './components/Pages/Restaurant'
import RestaurantList from './components/Pages/RestaurantList'


export default function App() {

  return (
    <View style={styles.container}>
<<<<<<< HEAD

      <Text>Things Changed Again!</Text>
      <StatusBar style="auto" />
      <Text>Again Things Changed !</Text>
      <List restaurants={restaurants} />
=======
      {/* <Login /> */}
      {/* <Menu /> */}
      {/* <Restaurant /> */}
      {/* <RestaurantList /> */}
>>>>>>> 0c0526307c93c7712f5810914262f9981e55511d
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
