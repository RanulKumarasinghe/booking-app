import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView,StyleSheet, Button, Text, Image, View } from "react-native";
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { RESTAURANT } from '../other/dummy-data';
import Navbar from '../components/Navbar';

const Restaurant = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View>
          <TopNavigation title={props.name} alignment='center' style={styles.header} />
          <View>
            <Image />
            {/**Self closing tag above, should the images be added into a constant folder? */}
          </View>
          <View>
            <Text>Restaurant Info</Text>
          </View>
          <View>
            <Image />
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
            <Button title="Make A Booking" onPress={() => { console.log() }} />
          </View>
        </View>
      </View>
      <View>
        <Navbar selectedIndex={2} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  font: {},
  button: {},

  header: {
    paddingTop: 10,
  },

});

Restaurant.defaultProps = {
  name: 'Default Name'
};

export default Restaurant;
