import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Text, Divider, Button, Layout } from '@ui-kitten/components';
import Firebase, {db} from '@/utils/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { proccessCheckout } from '@/store/actions/order'


const CheckOutScreen = (props) => {
  const order = useSelector(state => state.order);
  const userId = useSelector(state => state.auth.uid);

  const dispatch = useDispatch()

  const test = () => {
    const testFunction = Firebase.functions().httpsCallable('placeOrder')
    
    testFunction(decorator(order.cart)).then((result) => {
        console.log(result);
      })
      .catch(e=> {
        console.log(e)
      })
  }
  const test2 = () => {
    console.log(order)
  }

  const checkout = () => {
    const data = {
      cart: decorator(order.cart),
      restaurantId: order.orderRestaurantId,
      bookingId: order.bookingId,
    };
  
    proccessCheckout(data);
  
    props.navigation.navigate('Order Completed');
  };


const decorator = (cart) => {
  return cart.map((cartEntry) => {
    return {
      itemId: cartEntry.item.id,
      quantity: cartEntry.quantity,
    };
  });
};

  const calculateTotal = () => {
    let total = 0
    order.cart.forEach(item => {
      total = total + (item.item.price * item.quantity)
    });
    return total
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <View style={[styles.container, styles.headerContainerText]}>
          <Text style={styles.headerText}>Cart Items</Text>
          <Text style={styles.headerText}>Type: {order.type}</Text>
        </View>
        <Divider />
        {order.cart.map(cartItem => (  
          <View style={styles.container} key={cartItem.id}> 
            <View style={styles.headerContainerText}>
              <Text style={styles.itemName}>{cartItem.item.name}</Text>
              <Text style={styles.itemName}>£{cartItem.item.price * cartItem.quantity}</Text>
            </View>
            <View >
              <Text style={styles.description} category='p2'>{cartItem.item.description}</Text>
            </View>
            <Divider />
          </View>
        ))}
        <Text style={[styles.itemName, {alignSelf: 'flex-end', paddingRight: 20}]}>Total: £{calculateTotal()}</Text>
        <View style={styles.buttonSpacing}>
          <Button onPress={checkout}>Order</Button>
          <Button onPress={test2}>Order</Button>
        </View>
      </Layout>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  buttonSpacing: {
    marginTop: 15,
    width: '95%',
    alignSelf: 'center'
  },
  description: {
    flexWrap: 'wrap'
  },
  container: {
    padding: 20,
  },
  headerContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20
  },
  itemName: {
    fontSize: 20
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
