import React, { useState } from 'react';
import { Toggle, Text, Divider, Button, Spinner, Layout, Icon } from '@ui-kitten/components';
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native'

const BookingsListEntry = ({item}) => {
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
  const isCancelled = booking.status == 'cancelled'

  const image = { uri: "https://www.fsrmagazine.com/sites/default/files/styles/story_image_720x430/public/feature-images/state-full-service-restaurant-industry-1554901734.jpg?itok=-EciUerQ" };

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

  const BookingHeader = () => {
    return (
      <>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{booking.restname}</Text>
          <Text style={styles.headerSubTitle}>{constructDate(booking.date.seconds)}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle} >Table number: {booking.tableNumber}</Text>
          <Text style={isCancelled ? styles.headerTitleCanceled : styles.headerSubTitle}>
            Status: {capitalize(booking.status)}
          </Text>
        </View>
      </>
    )
  }

  const BookingContent = () => {
    if (true) {
      return (
        <>
          <Divider />
          <Text style={styles.typeTitle}>{"Booking"}</Text>
          <Divider />
          <View style={{ flexDirection: 'row', margin: 5 }}>
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Guests: {booking.guests}</Text>
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Time: {constructTime(booking.date.seconds)}</Text>
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
          <Text style={styles.headerSubTitle}>{booking.type}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={isCancelled ? styles.headerTitleCanceled : styles.headerTitle}>
            Status:
            {/* {capitalize(booking.status)} */}
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
          <View style={{ flexDirection: 'row', margin: 5 }}>
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>{booking.guests}</Text>
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Price:
            {/* {constructTime(booking.date.seconds)} */}
            </Text>
          </View>
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
        <Button style={styles.button} size='medium' status='basic' onPress={test}>
          Receipt
        </Button>
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
    borderRadius: 5,
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
    opacity: 0.75,
  },
  headerTitleCanceled: {
    color: "#e5383b",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    margin: 5,
    textShadowColor: 'white',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0.1,
      height: 0.1
    }
  },
  headerTitle: {
    alignSelf: 'flex-start',
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    margin: 5,
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: {
      width: 0.1,
      height: 0.1,
    }
  },
  headerSubTitle: {
    alignSelf: 'flex-end',
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0.1,
      height: 0.1,
    }
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
