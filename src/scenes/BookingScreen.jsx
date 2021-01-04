import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Divider, Icon, Button, TopNavigationAction, Datepicker } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { fetchAllRestaurantTimes } from '@/store/actions/bookings'


const BookingScreen = (props) => {
  const store = useSelector(state => state.bookings);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = React.useState(false)
  const [hide, setHide] = React.useState(true)

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const itemId = props.route.params.restaurantId;
  const restaurant = restaurants.find(restaurant => restaurant.id === itemId);

  let times = [];

  useEffect(() => {
    if(!loaded){
      dispatch(fetchAllRestaurantTimes(itemId));
      setLoaded(true);
    }
  });

  if(loaded){
    times = store.bookings[0].times;
  }

  const [tables, setTables] = React.useState();
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState()

  const checkBooked = (time) => {
    return !store.bookings[0].available.includes(time);
  }

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
          <Button key={id} size='small' style={{ margin: 1 }} disabled={checkBooked(elem)} onPress={(button) => { console.log(elem) }}>
            <Text>{elem}</Text>
          </Button>
      }
      )
      id++;
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
            format="YYYY-MM-DD"
            minDate={new Date()}
            maxDate="2021-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={(event, date) => {
              setDate(date);
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
    marginTop: '2%',
    paddingLeft: '8.3%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 7,
  },
});


export default BookingScreen;
