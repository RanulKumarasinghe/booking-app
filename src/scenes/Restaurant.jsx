import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { RESTAURANT } from '../other/dummy-data';

const Restaurant = props => {
  const itemId = props.route.params.itemID;

  const selectedRestaurant = RESTAURANT.find(restaurant => restaurant.id === itemId);
  return (
    <View>
        <Text>{selectedRestaurant.title}</Text>

        <Text>Info</Text>

        <Text>Deals</Text>

        <Text>Seating plan</Text>
    </View>
  );
}

export default Restaurant;
