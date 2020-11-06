import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import { RESTAURANT } from '../other/dummy-data';
import MealItem from '../components/List';

const RestaurantListScreen = props => {
  const renderRestaurantListItem = itemData => {
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectRestaurant={() => {props.navigation.navigate({
          routeName: 'RestaurantMenu',
          params: {
            categoryId: itemData.item.id
          }
        });
      }}
      />
    );
  };

  // const catId = props.navigation.getParam('categoryId');

  // const displayedRestaurants = MEALS.filter(
  //   meal => meal.categoryIds.indexOf(catId) >= 0
  // );

  return (
    <View style={styles.screen}>
      <FlatList
        data={RESTAURANT}
        keyExtractor={(item, index) => item.id}
        renderItem={renderRestaurantListItem}
        style={{ width: '100%' }}
      />
      <View>
          <Navbar selectedIndex={3} navigation={navigation} />
      </View>
    </View>
    
  );
};

RestaurantListScreen.navigationOptions = {
  headerTitle: 'Restaurant List'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default RestaurantListScreen;
