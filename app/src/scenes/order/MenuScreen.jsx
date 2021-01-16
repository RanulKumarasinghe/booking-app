import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Text, Button, Layout } from '@ui-kitten/components';
import Firebase from '@/utils/firebase'
import { useDispatch } from 'react-redux'
import { login } from '@/store/actions/auth'


const MenuScreen = (props) => {

  const dispatch = useDispatch()

  const goTo = () => {
    props.navigation.navigate('MenuItemScreen')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>CheckOut</Text>

        <Button onPress={goTo}>
          Item1
        </Button>
        <Button onPress={() => {props.navigation.navigate('CheckOutScreen')}}>
          CheckOut
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

export default MenuScreen;
