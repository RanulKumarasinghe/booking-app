import React from 'react';
import { SafeAreaView, TouchableHighlight, View, Image, StyleSheet } from 'react-native';
import { Text, Divider, Button, Drawer, DrawerGroup, DrawerItem } from '@ui-kitten/components';

//Formats text for the drawer
const MenuItem = (props) => {
  return (
    <>
    <TouchableHighlight style={styles.item} key={props.id} onPress={props.onPress} >
      <>
        <View>
          <Text category='p1'>{props.name}</Text>
        </View>
        <View >
          <Text style={{width: 300 }} category='p2'>{props.desc}</Text>
          <View style={styles.listRow}>
          <Text style={{width: 300 }} category='p2'>{props.price}</Text>
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
    backgroundColor: '#86ffc8',
  },
  image: {
    width: '10%',
    height: '50%',
    marginTop: 15
  },
  listRow: {
    flexDirection: 'row'
  },
});

export default MenuItem
