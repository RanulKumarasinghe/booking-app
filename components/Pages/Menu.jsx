import React from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import {Text, Card, Divider, TopNavigation, TopNavigationAction, Drawer, DrawerGroup, DrawerItem, Icon, Layout } from '@ui-kitten/components';

const price = () => (<Text category='p2'>£7.99</Text>);

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const foodListing = () => {
  return (
    <View>
      <View>
        <Text category='s1'>Medium Doner</Text>
      </View>
      <Divider />
      <Text category='p2'>Garlic and cloves in honey and spring water water water</Text>
    </View>
  );
}

export const MenuScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Menu' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Drawer
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <DrawerGroup title='Kebabs'>
          <DrawerItem title={foodListing} accessoryRight={price}/>
          <DrawerItem title={foodListing} accessoryRight={price}/>
        </DrawerGroup>
        <DrawerGroup title='Pizza'>
          <DrawerItem title={foodListing} accessoryRight={price}/>
          <DrawerItem title={foodListing} accessoryRight={price}/>
          <DrawerItem title={foodListing} accessoryRight={price}/>
          <DrawerItem title={foodListing} accessoryRight={price}/>
        </DrawerGroup>
        <DrawerGroup title='Hamburgers'>
          <DrawerItem title={foodListing} accessoryRight={price}/>
          <DrawerItem title={foodListing} accessoryRight={price}/>
          <DrawerItem title={foodListing} accessoryRight={price}/>
        </DrawerGroup>
      </Drawer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
  },
  card:{
    flex: 1,
    margin: 2,
  }
});

