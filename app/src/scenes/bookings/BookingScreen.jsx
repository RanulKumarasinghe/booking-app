import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";
import { Divider, Icon, Button, Layout, Datepicker, Drawer, DrawerItem, DrawerGroup } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { fetchReservations, fetchAvailableTables, postRReservation } from '@/store/actions/bookings';
import firebase from 'src/utils/firebase';

const BookingScreen = (props) => {
  const store = useSelector(state => state.bookings.reservations);
  const dispatch = useDispatch()

  const [guests, setGuests] = React.useState();
  const [date, setDate] = React.useState();
  const [dateString, setDateString] = React.useState();

  const user = firebase.auth().currentUser.uid;

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const restId = props.route.params.restaurantId;
  const restaurant = restaurants.find(restaurant => restaurant.id === restId);

  const times = [];
  const unavailableTimes = ['15:00', '15:15', '15:30', '15:45', '17:00', '17:15', '17:30'];
  const selectedTimes = [];

  const getDay = (date) => {
    return date.getDate();
  }

  const getMonth = (date) => {
    return date.getMonth() + 1;
  }

  const getYear = (date) => {
    return date.getFullYear();
  }

  const generateTimes = (start, end) => {
    for (let i = start; i < end; i++) {
      for (let j = 0; j < 60; j += 15) {
        j == 0 ? times.push(`${i}:0${j}`) : times.push(`${i}:${j}`);
      }
    }
  }

  /* 
  generateUnavailableTimes = () => {
 
  }
 */

 /*
 generateDrawer = () => {
   
 }
 */
  generateTimes(10, 19);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <View style={{ flex: 1 }}>
        <View style={{ padding: '2%', alignItems: "center" }}>
          <Text> Restaurant Name: {restaurant.name}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <DatePicker
            style={{ width: 200 }}
            date={dateString}
            mode="date"
            placeholder="Select a date"
            format="DD-MM-YYYY"
            minDate={new Date()}
            maxDate="2021-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={(event, date) => {
              setDate(date);
              setDateString(`${getDay(date)}-${getMonth(date)}-${getYear(date)}`);
            }}
          />
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>Number of guests</Text>
          <TextInput
            style={styles.table}
            keyboardType='number-pad'
            textAlign="center"
            onChangeText={(value) => {
              setGuests(value);
            }}
            maxLength={2}
          />
        </View>

        <Divider />

        <View style={styles.times}>
          <Drawer>
            <DrawerGroup title="Table_1">
              <DrawerItem title={times.map(time => {
                if (unavailableTimes.includes(time)) {
                  return (<Button disabled={true}>{time}</Button>)
                } else {
                  return (<Button onPress={() => { selectedTimes.push(time) }}>{time}</Button>)
                }
              })} />
            </DrawerGroup>
          </Drawer>
        </View>

        <View style={styles.submitButton}>
          <Button style={styles.button} onPress={() => {
            dispatch(fetchAvailableTables(guests, restId, getDay(date), getMonth(date), getYear(date)));
          }}>Search</Button>
          <Button style={styles.button} onPress={() => {
            console.log('VIP')
          }}>Reserve</Button>
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
  button: {
    margin: 2.5
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
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '2%',
  },
  timeButton: {

  },
  timeButtonSelected: {

  },
  times: {
    margin: '2.7%',
    padding: '0.5%',
    flex: 6,
    width: '95%',
    backgroundColor: '#C4C4C4',
    borderRadius: 5
  }
});

export default BookingScreen;
