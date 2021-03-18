import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Text, Button, Layout } from '@ui-kitten/components';
import Firebase from '@/utils/firebase'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '@/components/Menu/Menu'
const MenuScreen = (props) => {
  const order = useSelector(state => state.order);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <Menu navigation={props.navigation} order={true} cartNumberOfItems={order.cart.length} />
        <View style={styles.buttonSpacing}>
          <Button onPress={() => { props.navigation.navigate('Checkout') }}>
            CheckOut
        </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );

};


const styles = StyleSheet.create({
  buttonSpacing: {
    marginTop: 15,
    width: '95%',
    alignSelf: 'center'
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

export default MenuScreen;
