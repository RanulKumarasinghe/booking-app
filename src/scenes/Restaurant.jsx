import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, Text, Image, View } from "react-native";
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const Restaurant = props => {
  return (
    <View>
          <TopNavigation title={props.name} alignment='center' style={styles.header} />
      <View>
          <Image/> 
          {/**Self closing tag above, should the images be added into a constant folder? */}
      </View> 
      <View>
          <Text>Restaurant Info</Text>
      </View>
      <View>
          <Image/> 
          { /**The image for the star system 
          Could have staic image for star system?*/}
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
    
    header:{
      padding:10,
    },

});

Restaurant.defaultProps = {
  name: 'Default Name'
};

export default Restaurant;
