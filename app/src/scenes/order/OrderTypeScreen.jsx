import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Text, Button, Layout } from '@ui-kitten/components';
import Firebase from '@/utils/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderType } from '@/store/actions/order'


const OrderTypeScreen = (props) => {
  const restaurantId = props.route.params.restaurantId;

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const restaurant = restaurants.find(restaurant => restaurant.id === restaurantId);


  const dispatch = useDispatch()
  
  const handleInRestaurant = () => {
    dispatch(setOrderType('Eat In'));
    props.navigation.navigate('Menu')
  }
  
  const handleTakeAway = () => {
    dispatch(setOrderType('Take Away'));
    props.navigation.navigate('Menu')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text>{restaurant.name}</Text>


        <Button onPress={handleInRestaurant}>
          Add Item to Cart
        </Button>
        <Button onPress={handleTakeAway}>
          Add Item to Cart
        </Button>
      </Layout>
    </SafeAreaView>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})

export default OrderTypeScreen;
