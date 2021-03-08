import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Text, Divider, Button, Layout } from '@ui-kitten/components';
import Firebase, {db} from '@/utils/firebase'
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

  const test = () => {
    const testFunction = Firebase.functions().httpsCallable('placeOrder')
    
    testFunction(decorator(order.cart)).then((result) => {
        console.log(result);
      })
      .catch(e=> {
        console.log(e)
      })
  }

  const checkout = () => {
    // let cart = []
    // decorator(order.cart).map(cartItem => {
    //   cart.push({
    //     quantity: cartItem.quantity,
    //     item: db.doc(`restaurants/${order.restaurantId}/menu/${cartItem.itemId}`),
    //   })
    // })
    
    // console.log(cart)

    console.log(order)
    // db.collection('orders').add({card: order});
    // console.log(decorator(order.cart))
  }

  const test2 = async () => {

    // db.collection("orders").doc("T4Kp7Qj5hqGmmA8niWXC")
    // .get()
    // .then(function(doc) {
    //   if (doc.exists) {
    //     console.log("Found");
    //     await console.log(doc.data().card[0].item.get());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch(function(error) {
    //   console.log("Error getting document:", error);
    // });
  }

  const decorator = (cart) => {
    return cart.map(cartEntry => { 
      return {
        itemId: cartEntry.item.id,
        quantity: cartEntry.quantity
      }
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>CheckOut</Text>
        <Text>Type: {order.type}</Text>
        {order.cart.map(cartItem => (  
          <View key={cartItem.id}> 
            <View>
              <Text style={styles.itemName}>{cartItem.item.name}</Text>
            </View>
            <View >
              <Text style={{width: 300 }} category='p2'>Id: {cartItem.id}</Text>
              <Text style={{width: 300 }} category='p2'>Description: {cartItem.item.desc}</Text>
              <Text style={{width: 300 }} category='p2'>Quantity: {cartItem.quantity}</Text>
              <Text style={{width: 300 }} category='p2'>Price: {cartItem.item.price * cartItem.quantity}</Text>
            </View>
            <Divider />
          </View>
        ))}
        <Text>Total: </Text>
        <Button onPress={checkout}>Order</Button>
        <Button onPress={test2}>test2</Button>
      </Layout>
    </SafeAreaView>
  );

};


const styles = StyleSheet.create({
  itemName: {
    fontSize: 20
  },
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
