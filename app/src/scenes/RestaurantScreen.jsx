import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState }from "react";
import { SafeAreaView, StyleSheet, Image, View, ImageBackground, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { Divider, Icon, Layout, Text, Button, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
// import Navbar from '../../components/Navbar';
import Menu from '../components/Menu/Menu';
import StarRating from 'react-native-star-rating';
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux';
import { setOrderType } from '@/store/actions/order'
import {fetchAllMenu} from '@/store/actions/menu';



const Restaurant = (props) => {
  const restaurantManager = useSelector(state => state.staffRestaurant.restaurant);
  let restaurant
  if (!!restaurantManager) {
    restaurant = restaurantManager
    //
  } else {
    //Handle selection from Restaurant List
    const restaurants = useSelector(state => state.restaurants.restaurants);
    const itemId = props.route.params.itemID;
    restaurant = restaurants.find(restaurant => restaurant.id === itemId);
  }
  // const dispatch = useDispatch();

  // const getMenu = () => {
  //  dispatch(fetchAllMenu({
  //   id: restaurant.id
  // }))
  // }

  // useEffect(() => {
  //   getMenu()
  // }, [])

  // const menuItems = useSelector(state => state.menu.menu);

  // console.log(menuItems);
  // const menu = useSelector(state => state.menu.menu);
  // console.log(getMenu());


  // console.log(menu);
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const url  = 'https://maps.googleapis.com/maps/api/place/details/json?'
    const place = `place_id=${restaurant.google_id}`;
    const fields = '&fields=name,rating,formatted_phone_number,opening_hours,vicinity';
    const key = '&key=AIzaSyAP5rJS__ryEAgiFKsZMtMFDfsltB_1Vyc';
    const restaurantSearchUrl = url + place + fields + key;
    fetch(restaurantSearchUrl)
    .then(response => response.json())
    .then(result => setData(result))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
    });

  const onBooking = () => props.navigation.navigate('Booking', {
    restaurantId: restaurant.id
  });

  const onPending = () => props.navigation.navigate('Bookings Pending', {
    restaurantId: restaurant.id
  });

  const onOrder = () => {
    props.navigation.navigate('Order Type', {
      restaurantId: restaurant.id
    })
  };

  const auth = useSelector(state => state.auth);

  const onEditRestaurant = () => props.navigation.navigate('Edit Restaurant', {
    restaurantId: restaurant.id
  });

  const onMenuList = () => props.navigation.navigate('MenuList', {
    restaurantId: restaurant.id
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
               <Text style={styles.font1}>{restaurant.name}</Text>
              <Text style={styles.font}>Restaurant Info:</Text>
              <View style={styles.starrating}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={data.result?.rating}
                  fullStarColor={'#dbeb34'}
                  starSize={15}
                />
              </View>
              <View style={styles.description}>
                <Text>{restaurant.description}</Text>
                <Text>{data.result?.formatted_phone_number}</Text>
                <Text>{data.result?.vicinity}</Text>
              </View>
              <View style={styles.openHours}>
                <Text style={styles.font}>Opening hours:</Text>
              </View>
              <View>
                <Text>{data.result?.opening_hours.weekday_text[0]}</Text>
              </View>
              <View>
                <Text>{data.result?.opening_hours.weekday_text[1]}</Text>
              </View>
              <View>
                <Text>{data.result?.opening_hours.weekday_text[2]}</Text>
              </View>
              <View>
                <Text>{data.result?.opening_hours.weekday_text[3]}</Text>
              </View>
              <View>
                <Text>{data.result?.opening_hours.weekday_text[4]}</Text>
              </View>
              <View>
                <Text>{data.result?.opening_hours.weekday_text[5]}</Text>
              </View>
              <View>
                <Text>{data.result?.opening_hours.weekday_text[6]}</Text>
              </View>
              <View style={styles.menu}>
                <Menu navigation={props.navigation}
                restaurantId={restaurant.id}/>
              </View>
                <Button onPress={onBooking}>Make A Booking</Button>
            </View>
          </View>
          {/* <Divider />
          <Button onPress={onMenuList}>Menu List</Button> */}
          <Divider />
          <Button onPress={onOrder}>Order</Button>

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
  font1: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 1
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
