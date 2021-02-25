import React, { useState, setState, useEffect } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation, IndexPath } from '@ui-kitten/components';
// import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantMenuItem from '../../components/RestaurantMenuItem';
import {updateMenu} from '@/store/actions/menu';
import {deleteItem} from '@/store/actions/menu';
import {fetchAllFoodTypes, filterFoodType} from '@/store/actions/foodtypes';


const RestaurantEditMenu = (props) => {

  const dispatch = useDispatch();

  const menu = useSelector(state => state.menu.menu);
  const itemId = props.route.params.itemID;
  const menuItem = menu.find(menuItem => menuItem.id === itemId);

  const restaurantId = props.route.params.restaurantId;

  const [nameValue, onChangeName] = React.useState(menuItem.name);
  const [priceValue, onChangePrice] = React.useState(menuItem.price);
  const [descriptionValue, onChangeDescription] = React.useState(menuItem.description);
  const [imageUrlValue, onChangeImageUrl] = React.useState(menuItem.imageUrl);
  const [menuTypeValue, onChangeMenuType] = React.useState(menuItem.numType);

  let type = "";

  if (menuTypeValue == 0) {
    type = "Starter"
  }

  if (menuTypeValue == 1) {
    type = "Main"
  }

  if (menuTypeValue == 2) {
    type = "Dessert"
  }

  if (menuTypeValue == 3) {
    type = "Drinks"
  }

  console.log(restaurantId)
  const editMenu = () => {
    console.log('edit');
    setTimeout(() => {
    dispatch(updateMenu({
      rId: restaurantId,
      id: itemId,
      name: nameValue,
      price: priceValue,
      description: descriptionValue,
      imageUrl: imageUrlValue,
      numType: menuTypeValue,
      type: type
    }))
  }, 1000)
  };

  const deleteMenuItem = () => {
    dispatch(deleteItem({
      id: itemId,
      rId: restaurantId
    }))
  }

  const getMenu = () => {
    dispatch(fetchAllFoodTypes())
   }

   useEffect(() => {
     getMenu()
   }, [])

   const foodTypes = useSelector(state => state.foodType.foodType[0]);
   const foodType0 = foodTypes?.foodTypes[0];
   const foodType1 = foodTypes?.foodTypes[1];
   const foodType2 = foodTypes?.foodTypes[2];
   const foodType3 = foodTypes?.foodTypes[3];


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View>
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
        onMenuType= {(index)=> onChangeMenuType(index)}
        menuType={menuTypeValue}
        foodType0={foodType0}
        foodType1={foodType1}
        foodType2={foodType2}
        foodType3={foodType3}
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
