import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, FlatList, StyleSheet} from 'react-native';
import RestaurantMenuEntry from '@/components/RestaurantMenuEntry';
import { Button , Divider} from '@ui-kitten/components';

import { useSelector, useDispatch } from 'react-redux';
import {fetchAllMenu} from '@/store/actions/menu';

const RestaurantListMenuScreen = (props) => {
  const dispatch = useDispatch();


  const restaurantId = props.route.params.restaurantId;

  const getMenu = () => {
    dispatch(fetchAllMenu({
     id: restaurantId
   }))
   }

   useEffect(() => {
     getMenu()
   }, [])

  const menu = useSelector(state => state.menu.menu);

  const onAddMenuItem = () => props.navigation.navigate('Add Menu Item', {
    resID: restaurantId
  });

  const renderRestaurantMenuListItem = itemData => {
    console.log(itemData)
    return (
      <RestaurantMenuEntry
        id={itemData.item.id}
        name={itemData.item.name}
        picture={itemData.item.imageUrl}
        price={itemData.item.price}
        onSelectItem={() => props.navigation.navigate('EditMenuScreen', {
            itemID: itemData.item.id,
            resID: restaurantId
          })
        }
      />
    );
  };

  return (
    <View style={styles.header}>
      <Divider />
      {/* <View style={styles.buttonSpacing}>
         <Button onPress={onAddMenuItem}> Add Menu Item</Button>
      </View> */}
      <View style={styles.screen}>
        <FlatList
          data={menu}
          keyExtractor={(item, index) => item.id}
          renderItem={renderRestaurantMenuListItem}
          style={{ width: '100%' }}
        />
      </View>
      <View style={styles.buttonSpacing}>
        <Button onPress={onAddMenuItem}> Add Menu Item</Button>
      </View>
      <View>

      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    flex: 1
  },
  header: {
    paddingTop: 10,
    flex: 1
  },
  buttonSpacing: {
    marginTop: '5%',
    marginBottom: '1%',
    width: '100%',
    alignItems: 'center'
    }
});

export default RestaurantListMenuScreen


