import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RestaurantEntry from './RestaurantEntry';

export default function List({ restaurants }) {


  const restarantArray = () => {

    restaurants.forEach(restaurant => {
        return (<RestaurantEntry restaurant={restaurant} />)
      }
    );
  }

  return (
    <View>
      {restarantArray()}
    </View>
  );
}
