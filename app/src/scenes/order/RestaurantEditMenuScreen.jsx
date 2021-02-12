import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
// import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantMenuItem from '../../components/RestaurantMenuItem';
import {updateMenu} from '@/store/actions/menu';
import {deleteItem} from '@/store/actions/menu';

const RestaurantEditMenu = (props) => {

  const dispatch = useDispatch();

  const menu = useSelector(state => state.menu.menu);
  const itemId = props.route.getParam('itemID');

  const menuItem = menu.find(menuItem => menuItem.id === itemId);

  const restaurantId = props.route.getParam('resID');

  const auth = useSelector(state => state.auth);


  const [nameValue, onChangeName] = React.useState(menuItem.name);
  const [priceValue, onChangePrice] = React.useState(menuItem.price);
  const [descriptionValue, onChangeDescription] = React.useState(menuItem.description);
  const [imageUrlValue, onChangeImageUrl] = React.useState(menuItem.imageUrl);

  const editMenu = () => {
    console.log('edit');
    setTimeout(() => {
    dispatch(updateMenu({
      id: itemId,
      rId: restaurantId,
      name: nameValue,
      price: priceValue,
      description: descriptionValue,
      imageUrl: imageUrlValue,
    }))
  }, 4000)
  };

  const deleteMenuItem = () => {
    dispatch(deleteItem({
      id: itemId,
      rId: restaurantId
    }))
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View id={restaurant.id}>
      {/* <TopNavigation title="Restaurant Edit" alignment='center' style={styles.header} /> */}
      <ScrollView contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
      }}>
       <RestaurantMenuItem
        onName={text => onChangeName(text)}
        name={nameValue}
        onPrice={text => onChangePrice(text)}
        price={priceValue}
        onDescription={text => onChangeDescription(text)}
        description={descriptionValue}
        onImageUrl={text => onChangeImageUrl(text)}
        imageUrl={imageUrlValue}
      />
      <View style={styles.buttonSpacing}>
         <Button title="Delete Item" onPress={deleteMenuItem} />
         <Button title="Confirm Changes" onPress={editMenu} />
      </View>
      </ScrollView>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    flex: 1
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
