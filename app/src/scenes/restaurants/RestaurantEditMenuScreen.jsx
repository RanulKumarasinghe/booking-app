import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
// import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';

import {updateMenu} from '@/store/actions/menu';

const MultiTextInput = (props) => {
  return (
    <TextInput
      {...props}
      editable
      maxLength={200}
    />
  );
}

const RestaurantEditMenu = (props) => {
  const dispatch = useDispatch();

  const menu = useSelector(state => state.menu.menu);
  const itemId = props.route.params.itemID;

  const item = menu.find(item => item.id === itemId);

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const restaurant = restaurants.find(restaurant => restaurant.id === itemId);

  const r_id = restaurant.id;


  const [nameValue, onChangeName] = React.useState(item.name);
  const [priceValue, onChangePrice] = React.useState(item.price);
  const [pictureValue, onChangePicture] = React.useState(item.picture);
  const [descriptionValue, onChangeDescription] = React.useState(item.description);

  const editMenuItem = () => {
    dispatch(updateMenu({
      restaurantId: r_id,
      id: itemId,
      name: nameValue,
      price: priceValue,
      picture: pictureValue,
      description: descriptionValue
    }))
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View id={item.id}>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Name: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeName(text)}
          maxLength = {25}
          value = {nameValue}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Price: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangePrice(text)}
          maxLength = {25}
          value = {priceValue}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Picture: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangePicture(text)}
          value = {pictureValue}
         />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Description: </Text>
      <MultiTextInput
          multiline
          numberOfLines={5}
          style={styles.bigTextBox}
          onChangeText={text => onChangeDescription(text)}
          value = {descriptionValue}
          />
      </View>
      <View style={styles.buttonSpacing}>
         <Button title="No Changes" onPress={() => console.log('pressed')} />
         <Button title="Confirm Changes" onPress={editMenuItem} />
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    flex: 1
  },
  listRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center'
  },
  sizeFont: {
    fontSize: 16,
    width: '28%'
  },
  textBox: {
    height: 25,
    alignContent: 'space-around',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 4,
    width: '60%',
    fontSize: 16
  },
  bigTextBox: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 4,
    width: '60%',
    textAlignVertical: 'top'
  },
  switchStyle: {
    width: '60%',
    alignItems: 'flex-start'
  },
  buttonSpacing: {
    marginTop: '15%',
    marginBottom: '20%',
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
})

export default RestaurantEditMenu;


