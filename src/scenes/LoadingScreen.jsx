// Loading.js
import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useDispatch } from 'react-redux'
import {fetchAllRestaurant} from '@/store/actions/restaurants'

const LoadingScreen = (props) => {
  const dispatch = useDispatch()
  const [restaurantsLoaded, setRestaurantsLoaded] = useState(false);

  const fetchRestaurants = () => {
    dispatch(fetchAllRestaurant());
    setRestaurantsLoaded(true)
  }

  if (!restaurantsLoaded) {
    fetchRestaurants()
 
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <>
      {props.children}
    </>
    );
}

export default LoadingScreen;