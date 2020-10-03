import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RestaurantList(props) {

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
