import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, Text, View, Image } from "react-native";

const Restaurant = props => {
  return (
    <View>
      <View>
          <Text>Restaurant Name</Text>
      </View>
      <View>
          <Image/> 
          /**Self closing tag above, should the images be added into a constat folder? */
      </View> 
      <View>
          <Text>Restaurant Info</Text>
      </View>
      <View>
          <Image/> 
          /**The image for the star system 
          Could have staic image for star system?*/
      </View>
      <View>
          <Text>
            Selected info about the Restaurant
            This needs to be updated
          </Text>
      </View>
      <View>
        <Text>Place holder for menu</Text>
      </View>
      <View>
        <Button title="Make A Booking" onPress={() => {console.log()}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },

    font:{},
    button:{},


});

export default Restaurant;