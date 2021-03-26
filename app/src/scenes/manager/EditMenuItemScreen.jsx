import React, { useState, setState, useEffect } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView} from 'react-native';
import { Text, TopNavigation, IndexPath, Card, Modal, Button } from '@ui-kitten/components';
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

  const restaurantId = props.route.params.resID;

  const [visibleEditModal, setVisible] = React.useState(false);
  const [visibleDeleteModal, setDelVisible] = React.useState(false);


  const [nameValue, onChangeName] = React.useState(menuItem.name);
  const [priceValue, onChangePrice] = React.useState(menuItem.price.toString());
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

  const editMenu = () => {
    dispatch(updateMenu({
      rId: restaurantId,
      id: itemId,
      name: nameValue,
      price: +priceValue,
      description: descriptionValue,
      imageUrl: imageUrlValue,
      numType: menuTypeValue,
      type: type
    })), setVisible(true)
    // props.navigation.navigate('Restaurant')
  };

  const deleteMenuItem = () => {
    dispatch(deleteItem({
      id: itemId,
      rId: restaurantId
    })), setDelVisible(true)

    // props.navigation.navigate('Profile', {
    //   restaurantId: restaurantId
    // })
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

   const navEditItem = () => {
    props.navigation.navigate('Profile')
    setVisible(false)
  };

  const navDelItem = () => {
    props.navigation.navigate('Profile')
    setDelVisible(false)
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

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
         <Button title="Delete Item" onPress={deleteMenuItem} > Delete Item </Button>
         <Button title="Confirm Changes" onPress={editMenu} > Confirm Changes</Button>
      </View>
      </ScrollView>
      <Modal visible={visibleEditModal}
      backdropStyle={styles.backdrop}
      style={{ maxHeight: '50%', padding: 10 }}>
        <Card disabled={true}>
          <View style={styles.modalSpacing}>
          <Text>Menu Item updated!!</Text>
          </View>
          <Button onPress={navEditItem}>
            Finish
          </Button>
        </Card>
      </Modal>
      <Modal visible={visibleDeleteModal}
      backdropStyle={styles.backdrop}
      style={{ maxHeight: '50%', padding: 10 }}>
        <Card disabled={true}>
          <View style={styles.modalSpacing}>
          <Text>Menu Item deleted</Text>
          </View>
          <Button onPress={navDelItem}>
            Finish
          </Button>
        </Card>
      </Modal>
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
  modalSpacing: {
    marginBottom: '20%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
})
export default RestaurantEditMenu;
