import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import RestaurantMenuEntry from '../../components/RestaurantMenuEntry';
import { useSelector, useDispatch } from 'react-redux'

const RestaurantMenuListScreen = (props) => {
  const dispatch = useDispatch();

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const itemId = props.route.params.restaurantId;

  const restaurant = restaurants.find(restaurant => restaurant.id === itemId);

  const getMenu = () => {
    dispatch(fetchAllMenu({
     id: restaurant.id
   }))
   }

   useEffect(() => {
     getMenu()
   }, [])

  const menu = useSelector(state => state.menu.menu);

  const onAddMenuItem = () => props.navigation.navigate('Add Item', {
    restaurantId: restaurant.id
  });

  const renderRestaurantMenuListItem = itemData => {
    return (
      <RestaurantMenuEntry
        id={itemData.id}
        name={itemData.item.name}
        picture={itemData.item.picture}
        price={itemData.item.price}
        onSelectItem={() => props.navigation.navigate('EditMenuScreen', {
            itemID: itemData.item.id,
            resID: restaurant.id
          })
        }
      />
    );
  };

  return (
    <View style={styles.header}>
      <Divider />
      <View style={styles.screen}>
        <FlatList
          data={menu}
          keyExtractor={(item, index) => item.id}
          renderItem={renderRestaurantMenuListItem}
          style={{ width: '100%' }}
        />
      </View>
      <View style={styles.buttonSpacing}>
         <Button title="Add Menu Item" onPress={onAddMenuItem} />
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
  search: {
    flexDirection: 'row'
  },
  searchText: {
    fontSize: 20
  },
  buttonSpacing: {
    marginTop: '15%',
    marginBottom: '20%',
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  searchButton: {
    marginLeft: 15,
    height: 20,
    width: '20%'
  }
});

export default RestaurantMenuListScreen;


