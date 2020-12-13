import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Divider, Icon, Button, Layout, TopNavigation, TopNavigationAction, Datepicker } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native';

const BookingScreen = (props) => {

  const times = ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30"];

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const itemId = props.route.params.restaurantId;
  const restaurant = restaurants.find(restaurant => restaurant.id === itemId);
  const [tables, setTables] = React.useState();
  const [time, setTime] = React.useState()

  //Head of page
  const onBooking = () => props.navigation.navigate('Edit Restaurant', {
    restaurantID: restaurant.id
  });

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

  BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  //Body of page

  const generateTimeBoxes = () => {
    const timeArray = [];
    let id = 0
    times.forEach((elem) => {
      timeArray.push({
        id: id,
        element:
          <Button key={id} size='small'>
            <Text>{elem}</Text>
          </Button>
      }
      )
      id++;
    })
    return timeArray;
  }

  let date;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <View style={{ flex: 1 }}>
        <View style={{padding:'2%'}}>
          <Text> Restaurant Name: {restaurant.name}</Text>
        </View>
        <Divider/>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text>Pick Day and Time: </Text>
          <Datepicker
            date={date}
            onSelect={(e) => {
              console.log(date);
            }}
          />
          <View>
            <Text>Choose size of table: </Text>
            <TextInput
              style={styles.table}
              keyboardType='number-pad'
              onChangeText={text => onChangeText(text)}
              maxLength={2}
            />
          </View>
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Button>Search</Button>
        </View>
        <Divider />
        <View style={styles.timeButtonContainer}>
          {generateTimeBoxes().map((elem) => {
            return elem.element;
          })}
        </View>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginTop: 15
  },
  listRow: {
    flexDirection: 'row',
    marginTop: 15
  },
  buttonSpacing: {
    marginTop: '40%',
    width: '60%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  dateTime: {
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16
  },
  table: {
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: '40%',
    fontSize: 16
  },
  sizeFont: {
    fontSize: 16
  },
  timeButtonContainer: {
    paddingLeft: '8.3%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});


export default BookingScreen;
