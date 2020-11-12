import React, {useState} from "react";
import { SafeAreaView,StyleSheet, Button, Text, Image, View, ImageBackground, ScrollView, Dimensions } from "react-native";
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';

const Booking = (props) => {
  const restaurants = useSelector(state => state.restaurants.restaurants);
  const itemId = props.route.params.restaurantID;

  const restaurant = restaurants.find(restaurant => restaurant.id === itemId);


  const [date, setDate] = useState(new Date())


  const [value, onChangeText] = React.useState('Size of table');

  navigateBack = () => {
    props.navigation.goBack();
  };

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

  BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <TopNavigation title={restaurant.title} alignment='center' style={styles.header} />
      <View style={{ flex: 1 }}>

      <Text>Restaurant Name: {restaurant.title}</Text>


      <View style={styles.listRow}>
      <Text>Pick Day/Time: </Text>
      <DatePicker
        date={date}
        onDateChange={setDate}
        style={{width: 200}}
        format="YYYY-MM-DD"

      />

      </View>
      <View style={styles.listRow}>
        <Text>Choose size of table: </Text>
        <TextInput
          style={{ height: 20, borderColor: 'black', borderWidth: 1, width: '40%'}}
          keyboardType='number-pad'
          onChangeText={text => onChangeText(text)}
          defaultValue='Size of table'
          maxLength = {2}
        />
      </View>
      <View style={styles.buttonSpacing}>
         <Button title="Go Back" onPress={() => console.log('pressed')} />
         <Button title="Confirm" onPress={() => console.log('pressed')} />
      </View>
      </View>
      <View>
        <Navbar selectedIndex={1} navigation={props.navigation} />
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
  }
});


export default Booking;
