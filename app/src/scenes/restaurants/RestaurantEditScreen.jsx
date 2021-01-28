import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
// import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantInput from '../../components/RestaurantInput';
import {updateRestaurant} from '@/store/actions/restaurants';

const RestaurantEdit = (props) => {

  const dispatch = useDispatch();

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const itemId = props.route.params.restaurantId;

  const restaurant = restaurants.find(restaurant => restaurant.id === itemId);

  const auth = useSelector(state => state.auth);


  const [nameValue, onChangeName] = React.useState(restaurant.name);
  const [typeValue, onChangeType] = React.useState(restaurant.type);
  const [descriptionValue, onChangeDescription] = React.useState(restaurant.description);
  const [imageUrlValue, onChangeImageUrl] = React.useState(restaurant.imageUrl);

  const editRestaurant = () => {
    console.log('edit');
    setTimeout(() => {
    dispatch(updateRestaurant({
      id: itemId,
      name: nameValue,
      type: typeValue,
      description: descriptionValue,
      imageUrl: imageUrlValue,
      google_id: restaurant.google_id,
      staffId: auth.uid
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
       <RestaurantInput
        onName={text => onChangeName(text)}
        name={nameValue}
        onType={text => onChangeType(text)}
        type={typeValue}
        onDescription={text => onChangeDescription(text)}
        description={descriptionValue}
        onImageUrl={text => onChangeImageUrl(text)}
        imageUrl={imageUrlValue}
      />
      <View style={styles.buttonSpacing}>
         <Button title="No Changes" onPress={() => console.log('pressed')} />
         <Button title="Confirm Changes" onPress={editRestaurant} />
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
export default RestaurantEdit;
