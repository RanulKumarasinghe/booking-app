import React, { useState, setState, useEffect } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView} from 'react-native';
import { Text, Card, TopNavigation, Modal, Button } from '@ui-kitten/components';
// import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantMenuItem from '../../components/RestaurantMenuItem';
import {createItem} from '@/store/actions/menu';
import {fetchAllFoodTypes, filterFoodType} from '@/store/actions/foodtypes';


const MenuAddItem = (props) => {

  const dispatch = useDispatch();
  const restaurantId = props.route.params.resID;
  console.log(restaurantId);
  const auth = useSelector(state => state.auth);

  const [visible, setVisible] = React.useState(false);

  const [nameValue, onChangeName] = React.useState('');
  const [priceValue, onChangePrice] = React.useState('');
  const [descriptionValue, onChangeDescription] = React.useState('');
  const [imageUrlValue, onChangeImageUrl] = React.useState('');
  const [menuTypeValue, onChangeMenuType] = React.useState(0);

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

  const addMenuItem = () => {

    dispatch(createItem({
      rId: restaurantId,
      name: nameValue,
      price: +priceValue,
      description: descriptionValue,
      imageUrl: imageUrlValue,
      numType: menuTypeValue,
      type: type
    })), setVisible(true)
  //   props.navigation.navigate('Profile', {
  //   restaurantId: restaurantId
  // })
  //TODO: props natigate go back
  };

  const navItem = () => {
    props.navigation.navigate('Profile', {
        restaurantId: restaurantId
      })
    setVisible(false)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View id={restaurantId}>
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
         <Button title="Go Back" onPress={() => props.navigation.navigate('Edit Menu', {
          restaurantId: restaurantId})} > Go Back </Button>
         <Button title="Add Item" onPress={addMenuItem} > Add Item </Button>
      </View>
      </ScrollView>
      <Modal visible={visible}
      backdropStyle={styles.backdrop}
      style={{ maxHeight: '50%', padding: 10 }}>
        <Card disabled={true}>
          <View style={styles.modalSpacing}>
          <Text>Menu Item added!!</Text>
          </View>
          <Button onPress={navItem}>
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
export default MenuAddItem;
