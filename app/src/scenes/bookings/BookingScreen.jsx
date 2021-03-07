import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";
import { Divider, Icon, Button, Layout, Datepicker, List, ListItem } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { postReservation, fetchTablesBySize, fetchBookingsBySize, performSchedule, addTime } from '@/store/actions/bookings';
import firebase from 'src/utils/firebase';

const BookingScreen = (props) => {
  const all_scheduled_tables = useSelector(state => state.bookings.all_scheduled_tables);
  const times = useSelector(state => state.bookings.time);

  const dispatch = useDispatch()

  const [guests, setGuests] = React.useState();
  const [date, setDate] = React.useState();
  const [dateString, setDateString] = React.useState();
  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState(undefined);

  const user = firebase.auth().currentUser.uid;

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const restId = props.route.params.restaurantId;
  const restaurant = restaurants.find(restaurant => restaurant.id === restId);

  const getDay = (date) => {
    return date.getDate();
  }

  const getMonth = (date) => {
    return date.getMonth() + 1;
  }

  const getYear = (date) => {
    return date.getFullYear();
  }

  const constructDate = (time) => {
    const month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = (date.getDate()) < 10 ? "0" + (date.getDate()) : (date.getDate());
    const paddedTime = (time.length < 5) ? "0" + (time) : (time);
    const fullDate = new Date(date.getFullYear() + "-" + month + "-" + day + "T" + paddedTime);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(time), 0, 0, 0));
  }

  //LIST ITEM THIS WHERE IT RENDER THE LIST COMPONENTS
  //
  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${index} - table_id [${item.id}]`}
      description={item.available ? 'Available' : `Unavailable`}
      style={selectedIndex === index ? { backgroundColor: '#edf1f7' } : undefined}
      onPress={() => {
        setSelectedIndex(index);
      }
      }
    />
  );

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
            onChangeText={setGuests}
            maxLength={2}
          />
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>Start time</Text>
          <TextInput
            style={styles.table}
            keyboardType='number-pad'
            textAlign="center"
            onChangeText={setStart}
            maxLength={5}
          />
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>End time</Text>
          <TextInput
            style={styles.table}
            keyboardType='number-pad'
            textAlign="center"
            onChangeText={setEnd}
            maxLength={5}
          />
        </View>

        <Divider />

        {/*LIST THIS CONTAINER FOR THE LIST*/}
        <View style={styles.times}>
          <List
            data={all_scheduled_tables}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
            extraData={selectedIndex}
          />
        </View>

        <View style={styles.submitButton}>
          <Button style={styles.button} onPress={() => {
            dispatch(fetchTablesBySize(guests, restId));
            dispatch(fetchBookingsBySize(guests, restId));
            dispatch(addTime(constructDate(start), constructDate(end)));
            setTimeout(()=>{
              dispatch(performSchedule());
            },1000);
          }}>Search</Button>
          <Button style={styles.button} onPress={() => {
            dispatch(postReservation(all_scheduled_tables[selectedIndex].id, restId, user, guests, constructDate(start), constructDate(end), restaurant.name));
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
