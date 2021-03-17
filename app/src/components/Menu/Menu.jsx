import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { MenuData } from '../../other/dummy-data';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import  MenuItem from './MenuItem'
import { useSelector, useDispatch } from 'react-redux';
import {fetchAllMenu} from '@/store/actions/menu';


const Menu = (props) => {

  const dispatch = useDispatch();

  const getMenu = () => {
   dispatch(fetchAllMenu({
    id: props.restaurantId
  }))
  }

  useEffect(() => {
    getMenu()
  }, [])


  const [showMenu, setShowMenu] = useState(false);


  const restaurantId = props.restaurantId;

  const menuItems = useSelector(state => state.menu.menu);

  // console.log(props.restaurantId);
  // console.log(menuItems);

  // const onPress = (categoryId, itemId) => {
  //   props.navigation.navigate('Menu Item', {
  //   categoryId: categoryId,
  //   itemId: itemId,
  //   order: props.order
  // })};

  const renderMenuItem = itemData => {
    return (
      <MenuItem
        id={itemData.id}
        name={itemData.item.name}
        desc={itemData.item.description}
        price={itemData.item.price}
        imageUrl={itemData.item.imageUrl}
        type={itemData.item.type}
        onPress={() => props.navigation.navigate('Menu Item', {
            itemId: itemData.item.id,
            restaurantId: restaurantId,
            order: props.order
          })
        }
      />
    );

  }

  return (
    <View style={{ height: 'auto' }}>
      <TouchableHighlight onPress = {() => setShowMenu(!showMenu)} style = {styles.touchColor}>
      <Text category='h2' style={{ textAlign: 'center' }}> {!showMenu ? (<Text category='h2'>Show </Text>) : null}Menu</Text>
      </TouchableHighlight>
      <Divider />
      {showMenu ? (
      <FlatList
          data={menuItems}
          keyExtractor={(item, index) => item.id}
          renderItem={renderMenuItem}
          removeClippedSubviews= {true}
          onEndReachedThreshold={0.5}
        />
        ) : null}
      {/* {MenuData.map(category => (
            <View key={category.id}>
              <Text>{category.category}</Text>
              {category.items.map(item => (
                  <MenuItem {...item} onPress={() => onPress(category.id, item.id)}/>
              ))}
            </ View>
            )
          )
        } */}

    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    backgroundColor: '#ff4c89',
  },
  image: {
    width: '10%',
    height: '50%',
    marginTop: 15
  },
  touchColor: {
    backgroundColor: 'white'
  }
});

export default Menu;
