import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Divider, Drawer, DrawerGroup, DrawerItem } from '@ui-kitten/components';
import { MenuData } from '../other/dummy-data';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

//Formats text for the drawer
const setItemText = (name, desc, price) => {
  return (
    <View>
      <View>
        <Text category='p1'>{name}</Text>
      </View>
      <Divider />
      <View >
        <Text style={{ flex: 1, width: 300 }} category='p2'>{desc}</Text>
        <Text style={{ flex: 1, width: 300 }} category='p2'>{price}</Text>
      </View>
    </View>
  );
}

//Creates a container for drawer items
const createGroup = (data) => {
  return (
    <DrawerGroup
      key={data.id}
      title={data.category}>
      {createItems(data.options)}
    </DrawerGroup>
  );
}

//Creates group of drawer items for each category
const createItems = (options) => {
  const drawerItems = [];
  //
  // Temporary link before have access to database
  //
  const link = "https://reactnative.dev/img/tiny_logo.png";
  options.forEach(element => {
    drawerItems.push(
      <DrawerItem
        key={element.id}
        title={setItemText(element.name, element.desc, element.price)}
        accessoryRight={() => <Image source={{
          uri: link,
        }}
          style={styles.image} />}
      />
    );
  });
  return drawerItems;
}

const MenuComponent = (props) => {
  //Array holding containers for each dish type, eg kebab
  const drawerGroups = [];
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  MenuData.forEach(element => {
    drawerGroups.push(createGroup(element));
  })

  drawerGroups.map((group, index) =>
    <li key={group.index}>
        {group}
    </li>
  );


  return (
    <View style={{ height: 'auto' }}>
      <Text category='h5' style={{ textAlign: 'center' }}>Menu</Text>
      <Divider />
      <Drawer
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {drawerGroups}
      </Drawer>
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

export default MenuComponent;
