import React, {useState} from "react";
import { SafeAreaView,StyleSheet, Button, Text, Image, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';


const BookingScreen = (props) => {
  const restaurants = useSelector(state => state.restaurants.restaurants);
  const itemId = props.route.params.restaurantId;

  const restaurant = restaurants.find(restaurant => restaurant.id === itemId);

  // const onChange = time => this.setState({ time })
  const onBooking = () => props.navigation.navigate('Edit Restaurant', {
    restaurantID: restaurant.id
  });

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
      setShow(Platform.OS !== 'ios');
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === 'ios');
      setMode('date');
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [value, onChangeText] = React.useState('Size of table');

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

  BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  // return (<Text> Something Bookings</Text>)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      {/* <TopNavigation title={restaurant.name} alignment='center' style={styles.header} /> */}
      <View style={{ flex: 1 }}>

      <Text style={styles.sizeFont}>Restaurant Name: {restaurant.name}</Text>

      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Pick Day and Time: </Text>
      <TouchableOpacity onPress={showDatepicker}>
        <Text style={styles.dateTime}>{formatDate(date, time)}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}

        />
      )}


      </View>
      <View style={styles.listRow}>
        <Text style={styles.sizeFont}>Choose size of table: </Text>
        <TextInput
          style={styles.table}
          keyboardType='number-pad'
          onChangeText={text => onChangeText(text)}
          maxLength = {2}
        />
      </View>
      <View style={styles.buttonSpacing}>
         <Button title="Go Back" onPress={() => console.log('pressed')} />
         <Button title="Confirm" onPress={onBooking} />
      </View>
      </View>
    </SafeAreaView>

  );
}

const formatDate = (date, time) => {
  return `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
};

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
  }
});


export default BookingScreen;
