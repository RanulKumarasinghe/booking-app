import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";
import { Divider, Icon, Button, Layout, Datepicker, List, ListItem } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { postReservation, fetchTablesBySize, fetchBookingsByTable } from '@/store/actions/bookings';
import firebase from 'src/utils/firebase';

const BookingScreen = (props) => {
  const tablestore = useSelector(state => state.bookings.sized_tables);
  const bookingsstore = useSelector(state => state.bookings.table_bookings);
  const dispatch = useDispatch()

  const [guests, setGuests] = React.useState();
  const [date, setDate] = React.useState();
  const [dateString, setDateString] = React.useState();
  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();
  const [table, setTable] = React.useState("C3SpKCkToYhIPBhoekJC");
  const [fetchedTables, setFetchedTables] = React.useState([]);
  const [unavailableTables, setUnavailableTables] = React.useState([]);
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
    const month = ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
    const fullDate = new Date(date.getFullYear() + "-" + (month) + "-" + date.getDate() + "T" + time);
    return fullDate;
  }

  const scheduler = () => {
    console.log("haha Scheduler go brr");

    let startTimeStamp = Date.parse(constructDate(start));
    let endTimeStamp = Date.parse(constructDate(end));

    startTimeStamp = parseInt(startTimeStamp.toString().substring(0, 10));
    endTimeStamp = parseInt(endTimeStamp.toString().substring(0, 10));

    setTimeout(() => {
      bookingsstore.forEach(element => {
        if (element.start.seconds >= startTimeStamp && element.end.seconds <= endTimeStamp) {
          console.log('Should go brr')
          setUnavailableTables([...unavailableTables, element.tableid]);
        }
      });

      //Maps table data with availability based on if it can take in someone
      const mappedTables = tablestore.map((element) => {
        return { ...element, available: (unavailableTables.includes(element.id) ? false : true) };
      });
      //Maps tables by size with availability worked out above and sets it as the
      //Tables to be displayed in the list
      setFetchedTables(mappedTables);
    }, 1000);
  }

  //LIST ITEM THIS WHERE IT RENDER THE LIST COMPONENTS
  //
  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${index} - table_id [${item.id}]`}
      description={item.available ? 'Available' : `Unavailable`}
      style={selectedIndex === index ? {backgroundColor:'#edf1f7'} : undefined}
      onPress={() => {
          setSelectedIndex(index);
          console.log("go brrrr");
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
            data={fetchedTables}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
            extraData={selectedIndex}
          />
        </View>

        <View style={styles.submitButton}>
          <Button style={styles.button} onPress={() => {
            dispatch(fetchTablesBySize(guests, restId));
            dispatch(fetchBookingsByTable(table));
            scheduler();
          }}>Search</Button>
          <Button style={styles.button} onPress={() => {
            dispatch(postReservation(table, user, constructDate(start), constructDate(end)));
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
