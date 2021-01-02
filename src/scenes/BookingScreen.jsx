import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View} from "react-native";
import { Divider, Icon, Button, TopNavigationAction, Datepicker } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { fetchUnavailableFromRestaurant, postBooking } from '@/store/actions/bookings';
import firebase from 'src/utils/firebase'

const BookingScreen = (props) => {
  const store = useSelector(state => state.bookings);
  const dispatch = useDispatch()

  const [loaded, setLoaded] = React.useState(false)
  const [tables, setTables] = React.useState();
  const [date, setDate] = React.useState();

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const itemId = props.route.params.restaurantId;
  const restaurant = restaurants.find(restaurant => restaurant.id === itemId);

  let times = [];

  for (let i = 10; i < 10 + 11; i++) {
    for (let j = 0; j < 60; j += 15) {
      times.push(i + ":" + (j == 0 ? "00" : j))
    }
  }

  const getTimes = (formattedDate) => {
    dispatch(fetchUnavailableFromRestaurant(itemId, formattedDate));
    setTimeout(() => {
      setLoaded(true);
    }, 1000)
  }

  const formatDate = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return (day + '/' + month + '/' + year)
  }

  const checkBooked = (time) => {

    if (store.bookings.times === undefined) {
      return false;
    }
    return store.bookings.times.unavailable.includes(time);
  }

  const bookAction = (time) => {
    dispatch(postBooking(itemId, date, time))
    setTimeout(() => {
      setLoaded(true);
    }, 1000)
  }

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

  BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  //Body of page

  const generateTimeBoxes = () => {
    if (!loaded) {
      return [];
    }
    const timeArray = [];
    times.forEach((time) => {
      timeArray.push({
        element:
          <Button key={time} size='small' style={styles.timeButton} disabled={checkBooked(time)} onPress={() => { bookAction(time) }}>
            <Text>{time}</Text>
          </Button>
      }
      )
    })
    return timeArray;
  }

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
            date={date}
            mode="date"
            placeholder="Select a date"
            format="DD-MM-YYYY"
            minDate={new Date()}
            maxDate="2021-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={(event, date) => {
              const formattedDate = formatDate(date)
              setDate(formattedDate);
              getTimes(formattedDate);
            }}
          />
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>Number of tables</Text>
          <TextInput
            style={styles.table}
            keyboardType='number-pad'
            textAlign="center"
            onChangeText={(value) => {
              setTables(value);
            }}
            maxLength={2}
          />
        </View>

        <Divider />
        <View style={styles.timeButtonContainer}>
          {
            generateTimeBoxes().map((elem) => {
              return elem.element;
            })
          }
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
  timeButton: {
    width: "20%",
    margin: 1,
  },
  timeButtonContainer: {
    paddingLeft: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 7,
  },
});


export default BookingScreen;
