import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView,StyleSheet, Button, Text, Image, View, ImageBackground, ScrollView, Dimensions } from "react-native";
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { RESTAURANT } from '../other/dummy-data';
import Navbar from '../components/Navbar';
import MenuComponent from '@/components/Menu'
import StarRating from 'react-native-star-rating';
import { FlatList } from "react-native-gesture-handler";


const Restaurant = (props) => {
  const itemId = props.route.params.itemID;

  navigateBack = () => {
    props.navigation.goBack();
  };

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

  BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );


  const selectedRestaurant = RESTAURANT.find(restaurant => restaurant.id === itemId);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title= {selectedRestaurant.title} alignment='center' accessoryLeft={BackAction} />
      <Divider />
      <ScrollView contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
      }}>
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.listRow}>
          <Image
              source={{ uri: selectedRestaurant.image }}
              style={styles.bgImage}
            />
            <Text style={styles.font}>Restaurant Info:</Text>
            <View style={styles.starrating}>
            <StarRating
            disabled={true}
            maxStars={5}
            rating={selectedRestaurant.rating}
            fullStarColor={'#dbeb34'}
            starSize={15}

            />
            </View>
          <View>
            <Text>
              Selected info about the Restaurant
              This needs to be updated
          </Text>
          </View>
          <View style={styles.menu}>
            <MenuComponent />
          </View>
          <View>
            <Button title="Make A Booking" onPress={() => { console.log() }} />
          </View>
        </View>
        </View>
      </View>
      <View>
        <Navbar selectedIndex={2} navigation={props.navigation} />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  font: {
    fontWeight: 'bold',
    marginTop: 10
  },
  button: {},

  header: {
    marginTop: 25,
    flex: 1
  },
  bgImage: {
    width: 400,
    height: 180,
    paddingTop: 10
  },
  listRow: {
    flexDirection: 'column'
  },
  starrating: {
    alignSelf: 'flex-start'
  },
  menu: {
    paddingTop: 15
  }
});

Restaurant.defaultProps = {
  name: 'Default Name'
};

export default Restaurant;
