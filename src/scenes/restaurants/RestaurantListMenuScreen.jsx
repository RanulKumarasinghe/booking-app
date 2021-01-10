import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import RestaurantMenuEntry from '../../components/RestaurantMenuEntry';
import { useSelector, useDispatch } from 'react-redux'

const RestaurantMenuListScreen = (props) => {
  const menu = useSelector(state => state.menu.menu);

  const renderRestaurantMenuListItem = itemData => {
    return (
      <RestaurantMenuEntry
        id={itemData.id}
        name={itemData.item.name}
        picture={itemData.item.picture}
        price={itemData.item.price}
        onSelectItem={() => props.navigation.navigate('Edit Menu', {
            itemID: itemData.item.id
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
  searchButton: {
    marginLeft: 15,
    height: 20,
    width: '20%'
  }
});

export default RestaurantMenuListScreen;


