import React from 'react';
import { SafeAreaView } from 'react-native';
import { View } from 'react-native';
import {Text, Divider, Drawer, DrawerGroup, DrawerItem} from '@ui-kitten/components';
import {MenuData} from '../other/dummy-data';

//Formats text for the drawer
const setItemText = (name, desc) => {
  return (
    <View>
      <View>
        <Text category='s1'>{name}</Text>
      </View>
      <Divider />
      <View >
        <Text style={{flex:1, width:300}} category='p2'>{desc + " " + desc}</Text>
      </View>
    </View>
  );
}

//Creates a container for drawer items
const createGroup = (data) => {
  return (
  <DrawerGroup title={data.category}>
    {createItems(data.options)}
  </DrawerGroup>
  );
}

//Creates group of drawer items for each category
const createItems = (options) => {
  const drawerItems = [];
  options.forEach(element => {
    drawerItems.push(
    <DrawerItem 
      title={setItemText(element.name,element.desc)} 
      accessoryRight={() => <Text category='p2'>{element.price}</Text>}
    />
    );
  });
  return drawerItems;
}

const MenuScreen = ({ navigation }) => {
  //Array holding containers for each dish type, eg kebab
  const drawerGroups = [];
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  MenuData.forEach(element => {
    drawerGroups.push(createGroup(element));
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Text category='h5' style={{marginLeft:'4%'}}>Menu</Text>
      <Divider/>
      <Drawer
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
          {drawerGroups}
      </Drawer>
    </SafeAreaView>
  );
}

export default MenuScreen;
