import React from 'react';
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native'
import { Divider, Text, Button, Icon } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { postReservationCancelation } from '@/store/actions/bookings'
import BookingOrderEntry from './BookingOrderEntry'

export default BookingsList = (props) => {
  const dispatch = useDispatch();

  const cancelBooking = (bookingid) => {
    dispatch(postReservationCancelation(bookingid));
    props.callback();
  }

  const mappedData = props.payload.map((element) => {
    return ({ element, onCancel: cancelBooking })
  })

  return (
    //<View style={styles.container}>
    <FlatList
      data={mappedData}
      renderItem={BookingOrderEntry}
    // keyExtractor={(item) => item.element.docId}
    />
    //</View>
  );
}

const styles = StyleSheet.create({
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
