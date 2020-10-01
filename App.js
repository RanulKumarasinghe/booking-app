import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import List from './components/List';


export default function App() {

  const restaurants = [
    {
      name: 'Restaurant 1'
    },
    {
      name: 'Restaurant 2'
    },
    {
      name: 'Restaurant 3'
    }
  ]

  return (
    <View style={styles.container}>

      <Text>Things Changed Again!</Text>
      <StatusBar style="auto" />
      <Text>Again Things Changed !</Text>
      <List restaurants={restaurants} />
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
