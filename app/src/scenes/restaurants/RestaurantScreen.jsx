import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Button, Text, Image, View, ImageBackground, ScrollView, Dimensions } from "react-native";
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
// import Navbar from '../../components/Navbar';
import MenuComponent from '@/components/Menu'
import StarRating from 'react-native-star-rating';
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';


const Restaurant = (props) => {
  const restaurants = useSelector(state => state.restaurants.restaurants);
  const itemId = props.route.params.itemID;

  const restaurant = restaurants.find(restaurant => restaurant.id === itemId);

  const onBooking = () => props.navigation.navigate('Booking', {
    restaurantId: restaurant.id
  });

  const onPending = () => props.navigation.navigate('PendingBookingScreen', {
    restaurantId: restaurant.id
  });

  const auth = useSelector(state => state.auth);

  const PendingBookingButton = () => {
    if (auth.uid !== undefined) {
      return (
        <View>
          <Divider />
          <Button title="View pending bookings" onPress={onPending}/>
        </View>
      );
    } else {
      return null;
    }
  }

  const onEditRestaurant = () => props.navigation.navigate('Edit Restaurant', {
    restaurantID: restaurant.id
  });



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <View style={{ flex: 1 }}>
          <View>
            <View style={styles.listRow}>
              <Image
                source={{ uri: restaurant.imageUrl }}
                style={styles.bgImage}
              />
              <Text style={styles.font}>Restaurant Info:</Text>
              <View style={styles.starrating}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={restaurant.starRating}
                  fullStarColor={'#dbeb34'}
                  starSize={15}
                />
              </View>
              <View style={styles.description}>
                <Text>{restaurant.description}</Text>
                <Text>{restaurant.phone}</Text>
              </View>
              <View style={styles.openHours}>
                <Text style={styles.font}>Opening hours:</Text>
              </View>
              <View>
                <Text>Monday: {restaurant.monOpen} - {restaurant.monClose}</Text>
              </View>
              <View>
                <Text>Tuesday: {restaurant.tuesOpen} - {restaurant.tuesClose}</Text>
              </View>
              <View>
                <Text>Wednesday: {restaurant.wedOpen} - {restaurant.wedClose}</Text>
              </View>
              <View>
                <Text>Thursday: {restaurant.thursOpen} - {restaurant.thursClose}</Text>
              </View>
              <View>
                <Text>Friday: {restaurant.friOpen} - {restaurant.friClose}</Text>
              </View>
              <View>
                <Text>Saturday: {restaurant.satOpen} - {restaurant.satClose}</Text>
              </View>
              <View>
                <Text>Sunday: {restaurant.sunOpen} - {restaurant.sunClose}</Text>
              </View>
              <View style={styles.menu}>
                <MenuComponent />
              </View>
              <View style={styles.button}>
                <Button title="Make A Booking" onPress={onBooking} />
                <PendingBookingButton />
              </View>
            </View>
          </View>
          {auth.uid == restaurant.staffId ? <View style={styles.editButton}>
            <Button title="Edit Restaurant" onPress={onEditRestaurant} />
          </View> : <View></View>}
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
  button: {
    marginTop: 10,
    marginBottom: 15
  },

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
  },
  openHours: {
    marginTop: 10
  },
  description: {
    flexDirection: 'column'
  },
  editButton: {
    marginBottom: 10
  }
});

Restaurant.defaultProps = {
  name: 'Default Name'
};

export default Restaurant;
