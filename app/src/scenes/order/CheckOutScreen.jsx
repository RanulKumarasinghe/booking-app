import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Text, Divider, Button, Layout } from '@ui-kitten/components';
import Firebase from '@/utils/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/store/actions/auth'


const CheckOutScreen = (props) => {
  const order = useSelector(state => state.order);

  const dispatch = useDispatch()

  const goTo = () => {
    // props.navigation.navigate('Reset Password')
  }

  const totalCost = () => {

  }
  const checkout = () => {
    console.log(order)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>CheckOut</Text>
        <Text>Type: {order.type}</Text>
        {order.cart.map(cartItem => (  
          <View key={cartItem.item.id}> 
            <View>
              <Text category='p1'>{cartItem.item.name}</Text>
            </View>
            <View >
              <Text style={{width: 300 }} category='p2'>Description: {cartItem.item.desc}</Text>
              <Text style={{width: 300 }} category='p2'>Price: {cartItem.item.price}</Text>
              <Text style={{width: 300 }} category='p2'>Quantity: {cartItem.quantity}</Text>
            </View>
            <Divider />
          </View>
        ))}
        <Text>Total: </Text>
        <Button onPress={checkout}>Order</Button>
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

export default CheckOutScreen;
