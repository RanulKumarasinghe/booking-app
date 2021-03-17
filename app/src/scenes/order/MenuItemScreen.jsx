import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet, InputAccessoryView } from 'react-native';
import { Input, Divider, Text, Button, Layout } from '@ui-kitten/components';
import Firebase from '@/utils/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '@/store/actions/order'
import { MenuData } from '../../other/dummy-data';


const MenuItemScreen = (props) => {

  const params = props.route.params

  const dispatch = useDispatch()

  const menuItems = useSelector(state => state.menu.menu);

  const itemId = props.route.params.itemId;

  const menuItem = menuItems.find(menu => menu.id === itemId);

  const restaurantId = props.route.params.restaurantId;

  const test = () => {
    console.log(menuItem)
  }

  // const getCategory = () => {
  //   return MenuData.find(category => category.id == params.categoryId);
  // }

  // const category = getCategory();

  // const getItem = () => {
  //   return category.items.find(item => item.id == params.itemId);
  // }

  // const item = getItem();
  const [quantity, setQuantity] = useState(1)


  const handleAddItemToCard = () => {
    dispatch(setItem({item: menuItem, quantity: quantity}));
    props.navigation.navigate('Menu')
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
          <Text category='p1'>{menuItem.name}</Text>
        </View>
        <View >
          <Text style={{width: 300 }} category='p2'>{menuItem.description}</Text>
          <Text style={{width: 300 }} category='p2'>{`£${menuItem.price}`}</Text>
          <Input value={quantity} onChangeText={setQuantity}/>
        </View>
        {/* <Button onPress={editMenuItem}>
            Edit Item
          </Button> */}
        {params.order && (
          <View>
          <Button onPress={handleAddItemToCard}>
            Add Item to Cart
          </Button>
          <Button onPress={() => {props.navigation.navigate('MenuScreen')}}>
            Cancel
          </Button>
          <Button onPress={test}>
            Test
          </Button>
        </View> ) }
        <Divider />
      </Layout>
    </SafeAreaView>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})

export default MenuItemScreen;
