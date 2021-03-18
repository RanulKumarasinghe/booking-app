import React, { useState } from 'react';
import { Toggle, Text, Divider, Button, Spinner, Layout, Icon } from '@ui-kitten/components';
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

const BookingsListEntry = ({ item }) => {
  const isManager = useSelector(state => !!state.staffRestaurant.restaurant);

  // console.log(props)
  let isBooking
  if (item.element) {
    isBooking = true
  } else {
    isBooking = false
  }


  const booking = item.element;
  const order = item.order;

  const callback = item.onCancel;

  const test = () => {
    console.log(isBooking)
    console.log(booking)
    console.log(order)
  }

  const isCancelled = (booking ? booking.status == 'cancelled' : false) || (order ? order.status == 'cancelled' : false)

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const constructDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  const constructTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const time = `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
    return time;
  }

  const image = {};

  // if (new Date(item.date).getHours() > 17) {
  image.uri = "https://www.denverpost.com/wp-content/uploads/2016/04/20150209__20150211_C1_FE11FDROMANCEp2.jpg?w=620"
  // } else {
  //   image.uri = "https://images.unsplash.com/photo-1570894322743-aefb6905a4b5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGluaW5nJTIwdGFibGVzfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80"
  // }

  const BookingHeader = () => {
    return (
      <>
        <View style={styles.headerTextContainer}>
          <Text category='h3' style={styles.headerTitle}>{booking.restname}</Text>
          <Text category='p1' style={styles.headerSubTitle}>{constructDate(booking.date.seconds)}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text category='h3' style={styles.headerTitle} >Table number: {booking.tableNumber}</Text>
          <Text category='p1' style={styles.headerSubTitle}>
            Status: {capitalize(booking.status)}
          </Text>
        </View>
      </>
    )
  }

  const BookingContent = () => {
    if (booking) {
      return (
        <>
          <Divider />
          <Text style={styles.typeTitle}>{"Booking"}</Text>
          <Divider />
          <View style={{ flexDirection: 'row', margin: 5 }}>
            <Text category='p1' style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Guests: {booking.guests}</Text>
            <Text category='p1' style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Time: {constructTime(booking.date.seconds)}</Text>
          </View>
        </>
      )
    }
  }

  const OrderHeader = () => {
    return (
      <>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{'Restaurant Name'}</Text>
          <Text style={styles.headerSubTitle}>{order.type}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>
            Status:
            {order.status ? capitalize(order.status) : null}
          </Text>
        </View>
      </>
    )
  }

  const OrderContent = () => {
    if (order) {
      return (
        <>
          <Divider />
          <Text style={styles.typeTitle}>{"Order"}</Text>
          <Divider />
          <FlatList
            data={order.cart}
            // keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', alignContent: 'space-between', margin: 5 }}>
                <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>{item.item.name}</Text>
                <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>£{item.item.price}</Text>
              </View>
            )}
          />

        </>
      )
    }
  }

  return (
    <View style={styles.listEntryContainer}>
      {/* Header */}
      <ImageBackground source={image} style={styles.headerImg}>
        {/* <View style={styles.headerContainer}> */}
        {isBooking && BookingHeader() || OrderHeader()}
      </ImageBackground>
      {/*Content */}
      <View style={styles.listContentContainer, (isCancelled ? styles.listEntryCanceled : {})}>
        {BookingContent()}
        {OrderContent()}
      </View>
      {/* Buutons */}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} size='medium' status='basic' onPress={() => { callback(booking.docId) }}>
          Cancel
        </Button>
        {order && isManager (
          <Button style={styles.button} size='medium' status='basic' onPress={test}>
            Accept
          </Button>
        ) || null}
      </View>
    </View>
  );
}

export default BookingsListEntry

const styles = StyleSheet.create({
  typeTitle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: "bold",
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignContent: 'space-between'
  },
  icon: {
    margin: 5,
    width: 20,
    height: 20,
    alignItems: 'center'
  },
  container: {
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 5,
    alignSelf: "stretch",
  },
  listEntryCanceled: {
    backgroundColor: '#fbc3bc'
  },
  listEntryContainer: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 2,
    marginTop: 5,
    marginBottom: 5
  },
  headerContainer: {
    height: 85,
    width: '100%',
  },
  headerImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  headerTitle: {
    alignSelf: 'flex-start',
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    margin: 5,
  },
  headerSubTitle: {
    alignSelf: 'flex-start',
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
  },
  listContentContainer: {
    alignSelf: "stretch",
    backgroundColor: '#C4C4C4'
  },
  tableDetails: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    fontSize: 10,
    fontWeight: "bold",
  },
  orderPrice: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    padding: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: '50%',
    borderRadius: 0,
    borderLeftWidth: 1,
    borderColor: 'white',
  }
});
