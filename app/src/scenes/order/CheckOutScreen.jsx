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

  console.log(order)
  const totalCost = () => {

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>CheckOut</Text>
        <Text>Type: {order.type}</Text>
        {order.cart.map(cartItem => (  
          <View key={cartItem.id}> 
            <View>
              <Text category='p1'>{cartItem.name}</Text>
            </View>
            <Divider />

            <View >
              <Text style={{width: 300 }} category='p2'>{cartItem.desc}</Text>
              <Text style={{width: 300 }} category='p2'>{cartItem.price}</Text>
            </View>
          </View>
        ))}
        <Text>Total: </Text>
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
