import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Toggle, Text, Divider, Spinner, Layout, Icon } from '@ui-kitten/components';
import BookingsList from '@/components/BookingsList';
import { fetchBookingsByRestaurant, fetchBookingsByRestaurantFiltered } from '@/store/actions/staffRestaurant'
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native'


export default ReservationsScreen = ({ navigation }) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [showLoadingSpinner, setshowLoadingSpinner] = useState(true);
  const [filterToggle, setfilterToggle] = useState(true);
  const [refresh, setRefresh] = useState(false);

  let isLoggedIn = auth.uid === undefined;
  const restaurant_bookings = useSelector(state => state.staffRestaurant.restaurantBookings);
  const resid = useSelector(state => state.staffRestaurant.restaurant.id);


  const sortDates = (array) => {
    array.sort((a, b) => {
      return b.createdAt.toDate() - a.createdAt.toDate();
    })
    return array;
  }

  const onCheckedChange = () => {
    setfilterToggle(!filterToggle);
    doRefresh();
  };

  const doRefresh = () => {
    setRefresh(!refresh);
  };

  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isLoggedIn) {
      setshowLoadingSpinner(true);
      dispatch(fetchBookingsByRestaurant(resid));
      setTimeout(() => {
        setshowLoadingSpinner(false);
      }, 2000);
    }
  }, [isFocused, filterToggle]);

  const WarningIcon = () => (
    <Icon
      style={styles.icon}
      fill='#8F9BB3'
      name='alert-triangle-outline'
    />
  );

  const ToggleFilter = () => {
    return (
      <View>
        <View style={styles.toggleContainer}>
          <Toggle style={styles.toggleElement} checked={filterToggle} onChange={onCheckedChange}>
            <Text appearance='hint'>Filter Expired</Text>
          </Toggle>
        </View>
        <Divider />
      </View>
    );
  }

  const restaurant_bookings_filtered = restaurant_bookings.filter((booking) => booking.booking)

  const List = () => {
    if (!showLoadingSpinner && !isLoggedIn) {
      let bookingList = restaurant_bookings;
      if (filterToggle) {
        const now = new Date();
        bookingList = bookingList.filter((element) => element.date.toDate().getTime() > now.getTime());
      }
      const sortedBookings = sortDates(bookingList);
      return (<BookingsList payload={sortedBookings} callback={onCheckedChange} />);
    } else {
      return (<></>)
    }
  }

  const LoadingScreen = () => {
    if (showLoadingSpinner) {
      return (
        <View style={styles.datePicker}>
          <Spinner />
        </View>
      );
    } else {
      return (<></>)
    }
  }

  const LoginError = () => {
    if (isLoggedIn) {
      return (
        <TouchableOpacity style={styles.loginError} onPress={() => {
          navigation.navigate(
            "User", { screen: 'Login' },
          );
        }}>
          <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
            <WarningIcon />
            <Text appearance='hint'>PLEASE LOG IN</Text>
          </View>
          <Text style={{ flex: 1 }} appearance='hint'>Tap to redirect</Text>
        </TouchableOpacity>
      );
    } else {
      return (<View></View>)
    }
  }

  const EmptyError = () => {
    if (!isLoggedIn) {
      return (
        <TouchableOpacity style={styles.loginError} onPress={() => {
          navigation.navigate("Restaurants");
        }}>
          <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <WarningIcon />
            <Text style={{ marginTop: 10 }} appearance='hint'>Oops we found no bookings!</Text>
          </View>
          <Text style={{ flex: 1 }} appearance='hint'>Tap this screen to start booking</Text>
        </TouchableOpacity>
      );
    } else {
      return (<View></View>)
    }
  }

  //Screen render code

  if (isLoggedIn) {
    return (
      <LoginError />
    )
  } else if (showLoadingSpinner) {
    return (
      <LoadingScreen />
    )
  }
  else if (restaurant_bookings.length < 1) {
    <EmptyError />
  }
  else {
    return (
      <Layout style={styles.container}>
        <ToggleFilter />
        <List />
      </Layout>
    );
  }
};


//Get dimensions of screen
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    maxHeight: "100%",
    marginLeft: '3%',
    marginRight: '3%',
    marginBottom: '3%',
    marginTop: '8%',
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
  },
  loginError: {
    width: "100%",
    height: "100%",
    marginTop: '1%',
    marginBottom: '1%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePicker: {
    marginTop: '1%',
    marginBottom: '1%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginBottom: '1%',
    marginTop: '1%',
  },
  toggleElement: {
    paddingLeft: 5,
    flex: 1,
    textAlign: "center",
  },
  icon: {
    width: 32,
    height: 32,
  },
});
