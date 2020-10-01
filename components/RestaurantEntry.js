import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RestaurantEntry(props) {

  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
}
