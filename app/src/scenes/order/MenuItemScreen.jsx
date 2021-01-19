import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Divider, Text, Button, Layout } from '@ui-kitten/components';
import Firebase from '@/utils/firebase'
import { useDispatch } from 'react-redux'
import { setItem } from '@/store/actions/order'
import { MenuData } from '../../other/dummy-data';


const MenuItemScreen = (props) => {

  const params = props.route.params

  const dispatch = useDispatch()


  const getCategory = () => {
    return MenuData.find(category => category.id == params.categoryId);
  }

  const category = getCategory();

  const getItem = () => {
    return category.items.find(item => item.id == params.itemId);
  }

  const item = getItem();

  const handleAddItemToCard = () => {
    dispatch(setItem(item));
    props.navigation.navigate('Menu')
  }
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
          <Text category='p1'>{item.name}</Text>
        </View>
        <Divider />

        <View >
          <Text style={{width: 300 }} category='p2'>{item.desc}</Text>
          <Text style={{width: 300 }} category='p2'>{item.price}</Text>
        </View>
        {params.order && (
          <View>
          <Button onPress={handleAddItemToCard}>
            Add Item to Cart
          </Button>
          <Button onPress={() => {props.navigation.navigate('MenuScreen')}}>
            Cancel
          </Button>
        </View> ) }
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

export default MenuItemScreen;
