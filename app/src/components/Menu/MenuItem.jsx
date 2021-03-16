import React from 'react';
import { SafeAreaView, TouchableHighlight, View, Image, StyleSheet, ImageBackground} from 'react-native';
import { Text, Divider, Button, Drawer, DrawerGroup, DrawerItem } from '@ui-kitten/components';
import { useSelector } from "react-redux";

//Formats text for the drawer
const MenuItem = (props) => {
  const restaurantManager = useSelector(state => state.staffRestaurant.restaurant);
  // console.log(restaurantManager)
  let disabled = false;
  if (restaurantManager != null) {
    disabled = true;
  }
  return (
    <>
    <TouchableHighlight disabled={disabled} style={styles.item} key={props.id} onPress={props.onPress} >
      <>
        <View style={styles.listRow}>
          <Text category='p1'>{props.name}</Text>
          <ImageBackground
              source={{ uri: props?.imageUrl }}
              style={styles.bgImage}
            >
            </ImageBackground>
        </View>
        <View >
        <View style={styles.listRow}>
          <Text style={{width: 300 }} category='p2'>{props.desc}</Text>
          </View>
          <View style={styles.listRow}>
          <Text style={{width: 300 }} category='p2'>{`£${props.price}`}</Text>
          <Text style={{width: 300 }} category='p2'>{props.type}</Text>
          </View>
        </View>
      </>
    </TouchableHighlight>
    <Divider />
    </>
  );
}


const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: '#34ebe8',
  },
  image: {
    width: '10%',
    height: '50%',
    marginTop: 15
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bgImage: {
    width: 40,
    height: 40
  }
});

export default MenuItem
