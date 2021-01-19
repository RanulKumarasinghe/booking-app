import React from 'react';
import { SafeAreaView, TouchableHighlight, View, Image, StyleSheet } from 'react-native';
import { Text, Divider, Button, Drawer, DrawerGroup, DrawerItem } from '@ui-kitten/components';

//Formats text for the drawer
const MenuItem = (props) => {
  return (
    <TouchableHighlight key={props.id} onPress={props.onPress} >
      <>
        <View>
          <Text category='p1'>{props.name}</Text>
        </View>
        <Divider />
        <View >
          <Text style={{width: 300 }} category='p2'>{props.desc}</Text>
          <Text style={{width: 300 }} category='p2'>{props.price}</Text>
        </View>
      </>
    </TouchableHighlight>
  );
}

export default MenuItem