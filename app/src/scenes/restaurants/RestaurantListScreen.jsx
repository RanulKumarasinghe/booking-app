import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
// import Navbar from '../../components/Navbar';
import RestaurantEntry from '../../components/RestaurantEntry';
import { Button,Icon , Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux'

import {filterRestaurant, fetchAllRestaurant} from '@/store/actions/restaurants'


const RestaurantListScreen = props => {

  const dispatch = useDispatch()
  const getRestaurants = () => {
    dispatch(fetchAllRestaurant())
   }

   useEffect(() => {
    getRestaurants()
   }, [])

   const restaurants = useSelector(state => state.restaurants.filteredRestaurant);

  // START name filter
  const [searchName, setSearchName]= useState('')

  const filterHandler = (name) => {
    setSearchName(name)
    dispatch(filterRestaurant(name))
  }

  const renderRestaurantListItem = itemData => {

    return (
      <RestaurantEntry
        id={itemData.id}
        name={itemData.item.name}
        imageUrl={itemData.item.imageUrl}
        vegan={itemData.item.vegan}
        type={itemData.item.type}
        google_id={itemData.item.google_id}
        starRating={itemData.item.starRating}
        onSelectRestaurant={() => props.navigation.navigate('Restaurant', {
            itemID: itemData.item.id
            //TODO: Send Page name as well
          })
        }
      />
    );
  };


  return (
    <View style={styles.header}>
      {/* <TopNavigation title='Restaurant List' alignment='center' /> */}
      <Divider />
      <View style={styles.screen}>
        <View style={styles.search}>
          <Text style={styles.searchText}>Search: </Text>
          <TextInput
            style={{ height: 30, borderColor: '#7a42f4', borderWidth: 1, borderRadius: 5 }}
            value={searchName}
            onChangeText={(text)=> filterHandler(text)}
            width="60%"
            placeholder="Restaurant"

          />
        </View>
        <FlatList
          data={restaurants}
          keyExtractor={(item, index) => item.id}
          renderItem={renderRestaurantListItem}
          style={{ width: '95%' }}
          removeClippedSubviews= {true}
          onEndReachedThreshold={0.5}
        />
      </View>
      <View>
        {/* <Navbar selectedIndex={1} navigation={props.navigation} /> */}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    flex: 1
  },
  header: {
    paddingTop: 10,
    flex: 1
  },
  search: {
    flexDirection: 'row',
    paddingBottom: 15
  },
  searchText: {
    fontSize: 20
  },
  searchButton: {
    marginLeft: 15,
    height: 20,
    width: '20%'
  }
});

export default RestaurantListScreen
