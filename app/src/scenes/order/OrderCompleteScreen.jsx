import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Text, Button, Layout } from '@ui-kitten/components';


const OrderCompleteScreen = (props) => {

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SafeAreaView style={styles.container}>

        <Text category='h5'>Success!</Text>
        <Text category='p1'>Your Order has been taken</Text>
        <Button onPress={() => props.navigation.popToTop()}>Close</Button>
      </SafeAreaView>
    </Layout>
  );

};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    maxWidth: '90%',
    margin: 10
  }
});

export default OrderCompleteScreen;
