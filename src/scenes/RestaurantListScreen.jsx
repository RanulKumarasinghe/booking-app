import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import { RESTAURANT } from '../other/dummy-data';
import RestaurantEntry from '../components/RestaurantEntry';
import { Button,Icon , Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { ListItem, SearchBar } from 'react-native-elements';


const RestaurantListScreen = (props) => {
  
  navigateBack = () => {
    props.navigation.goBack();
  };

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

  BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  
  const renderRestaurantListItem = itemData => {
    return (
      <RestaurantEntry
        id={itemData.id}
        title={itemData.item.title}
        image={itemData.item.image}
        vegan={itemData.item.vegan}
        type={itemData.item.type}
        rating={itemData.item.rating}
        onSelectRestaurant={() => props.navigation.navigate('Restaurant', {
          itemID: itemData.item.id
        }
          //   {
          //   routeName: 'Restaurant',
          //   params: {
          //     categoryId: itemData.item.id
          //   }
          // }
        )
        }
      />
    );
  };

  // searchFilterFunction = text => {
  //   this.setState({
  //     value: text,
  //   });

  //   const newData = this.arrayholder.filter(item => {
  //     const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
  //     const textData = text.toUpperCase();

  //     return itemData.indexOf(textData) > -1;
  //   });
  //   this.setState({
  //     data: newData,
  //   });
  // }

  // renderHeader = () => {
  //   return (
  //     <SearchBar
  //       placeholder="Type Here..."
  //       lightTheme
  //       round
  //      // onChangeText={text => this.searchFilterFunction(text)}
  //       autoCorrect={false}
  //       value={this.state.value}
  //     />
  //   );
  // };

  return (
    <View style={styles.header}>
      <TopNavigation title='Restaurant List' alignment='center' accessoryLeft={BackAction} />
      <Divider />
      <View style={styles.screen}>
        <View style={styles.search}>
          <Text>Search: </Text>
          <TextInput
            style={{ height: 20, borderColor: '#7a42f4', borderWidth: 1 }}
            width="60%"
            placeholder="Restaurant"
          />
        </View>
        <FlatList
          data={RESTAURANT}
          keyExtractor={(item, index) => item.id}
          renderItem={renderRestaurantListItem}
          style={{ width: '100%' }}
        />
      </View>
      <View>
        <Navbar selectedIndex={1} navigation={props.navigation} />
      </View>
    </View>
  );
};

RestaurantListScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Restaurant List'
  }
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    flex: 1
  },
  header: {
    paddingTop: 10,
    flex: 1
  },
  search: {
    flexDirection: 'row'
  }
});

export default RestaurantListScreen;
