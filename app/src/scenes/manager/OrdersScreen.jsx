import React, {useState, useEffect} from 'react';
import { Input, Text, Button, Layout } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/actions/auth'
import LoginRequired from '@/components/LoginRequired'
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native'
import BookingOrderEntry from '@/components/BookingOrderEntry'
import {acceptOrder} from '@/store/actions/staffRestaurant';

const OrderScreen = (props) => {
  const restaurant = useSelector(state => state.staffRestaurant.restaurant);
  const restaurantOrders = useSelector(state => state.staffRestaurant.restaurantOrders);

  const onAcceptOrder = (orderId) => {
    useDispatch(acceptOrder(restaurantId, orderId))
  }

  const orderCheck = (order) => order.order

  const mappedData = restaurantOrders.filter(orderCheck).map((order) => {
    return ({ element: order, isManager: !!restaurant, 
      onAccept: onAcceptOrder
    })
  })
    
  const List = () => {
      return (
        <FlatList
        data={mappedData}
        renderItem={BookingOrderEntry}
        keyExtractor={(item) => item.element.id}
      />  
      )
  }

  if (!restaurant) {
    return (
      <LoginRequired />
    )
  } else {
    return (
      <Layout style={styles.container}>
        <Button onPress={() => console.log(restaurantOrders)} />
        <List />
      </Layout>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    maxHeight: "100%",
    marginLeft: '3%',
    marginRight: '3%',
    marginBottom: '3%',
    marginTop: '8%',
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
  },
  datePicker: {
    marginTop: '1%',
    marginBottom: '1%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginBottom: '1%',
    marginTop: '1%',
  },
  toggleElement: {
    paddingLeft: 5,
    flex: 1,
    textAlign: "center",
  },
  icon: {
    width: 24,
    height: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});


export default OrderScreen;
