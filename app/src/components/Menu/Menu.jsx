import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { MenuData } from '../../other/dummy-data';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import  MenuItem from './MenuItem'

const Menu = (props) => {

  const onPress = (categoryId, itemId) => {
    props.navigation.navigate('Menu Item', {
    categoryId: categoryId,
    itemId: itemId,
    order: props.order
  })};

  return (
    <View style={{ height: 'auto' }}>
      <Text category='h5' style={{ textAlign: 'center' }}>Menu</Text>
      <Divider />
      {MenuData.map(category => (
            <View key={category.id}>
              <Text>{category.category}</Text>
              {category.items.map(item => (
                  <MenuItem {...item} onPress={() => onPress(category.id, item.id)}/>
              ))}
            </ View>
            )
          )
        }
      
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '10%',
    height: '50%',
    marginTop: 15
  }
});

export default Menu;
