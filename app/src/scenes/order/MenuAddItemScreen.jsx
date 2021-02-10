import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
// import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantMenuItem from '../../components/RestaurantMenuItem';
import {createItem} from '@/store/actions/menu';

const MenuAddItem = (props) => {

  const dispatch = useDispatch();
  const restaurantId = props.route.getParam('resID');

  const auth = useSelector(state => state.auth);


  const [nameValue, onChangeName] = React.useState('');
  const [priceValue, onChangePrice] = React.useState('');
  const [descriptionValue, onChangeDescription] = React.useState('');
  const [imageUrlValue, onChangeImageUrl] = React.useState('');

  const addMenuItem = () => {
    console.log('edit');
    setTimeout(() => {
    dispatch(createItem({
      rId: restaurantId,
      name: nameValue,
      price: priceValue,
      description: descriptionValue,
      imageUrl: imageUrlValue,
    }))
  }, 4000)
  };

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
         <Button title="No Changes" onPress={() => console.log('pressed')} />
         <Button title="Confirm Changes" onPress={addMenuItem} />
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
export default MenuAddItem;
