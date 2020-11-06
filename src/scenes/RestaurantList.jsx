import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { RESTAURANT } from '../other/dummy-data';
import MealItem from '../components/List';

const RestaurantListScreen = props => {
  const renderRestaurantListItem = itemData => {
    return (

      <MealItem
        title={itemData.item.title}
        image={itemData.item.image}
        vegan={itemData.item.vegan}
        type={itemData.item.type}
        rating={itemData.item.rating}
        onSelectRestaurant={() => props.navigation.navigate({
          routeName: 'Restaurant',
          params: {
            categoryId: itemData.item.id
          }
        })
      }
      />
    );
  };

  return (
      <FlatList
        data={RESTAURANT}
        keyExtractor={(item, index) => item.id}
        renderItem={renderRestaurantListItem}
        style={{ width: '100%' }}
      />
  );
};

RestaurantListScreen.navigationOptions = navigationData => {
  return {
  headerTitle: 'Restaurant List'
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingTop: 45
  }
});

export default RestaurantListScreen;
