import React from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import {Text, Divider, TopNavigation, TopNavigationAction, Drawer, DrawerGroup, DrawerItem, Icon} from '@ui-kitten/components';

const data = [{
  category:'Kebab',
  options:[{
    name:'Doner kebab wrap',
    desc:'Wrap with lamb doner meat, sliced and seasoned',
    price:'£6.99'
  },
  {
    name:'Kebab meat',
    desc:'Strips of kebab meat served with sauce',
    price:'£5.99'
  },
  {
    name:'Kebab meat with chips',
    desc:'Strips of kebab meat served with sauce and chips',
    price:'£6.99'
  }
]},
{
  category:'Hamburger',
  options:[{
    name:'Burger',
    desc:'Wrap with lamb doner meat, sliced and seasoned',
    price:'4.99'
  },
  {
    name:'Double burger',
    desc:'Strips of kebab meat served with sauce',
    price:'£6.99'
  },
  {
    name:'Cheese burger',
    desc:'Strips of kebab meat served with sauce',
    price:'£5.99'
  },
  {
    name:'Double cheese burger',
    desc:'Strips of kebab meat served with sauce',
    price:'£7.99'
  }
]
}];

const price = () => (<Text category='p2'>£7.99</Text>);

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

//Formats text for the drawer
const drawerTextFactory = (name,desc) => {
  return (
    <View>
      <View>
    <Text category='s1'>{name}</Text>
      </View>
      <Divider />
      <Text category='p2'>{desc}</Text>
    </View>
  );
}

//Creates a container for drawer items
const drawerGroupFactory = (data) => {
  return (
  <DrawerGroup title={data.category}>
    {drawerItemFactory(data.options)}
  </DrawerGroup>
  );
}

//Creates individual drawer items for each dish
const drawerItemFactory = (options) => {
  const drawerItems = [];
  options.forEach(element => {
    drawerItems.push(
      <DrawerItem title={drawerTextFactory(element.name,element.desc)} accessoryRight={price}/>
    );
  });
  return drawerItems;
}

export const MenuScreen = ({ navigation }) => {
  //Array holding containers for each dish type, eg kebab
  const drawerGroup = [];
  
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  {data.forEach(element => {
    drawerGroup.push(drawerGroupFactory(element));
  })}

  console.log(drawerGroup);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Menu' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Drawer
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
          {drawerGroup}
      </Drawer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
  },
  card:{
    flex: 1,
    margin: 2,
  }
});

