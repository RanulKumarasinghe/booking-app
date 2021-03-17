import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Toggle, Text, Divider, Spinner, Layout, Icon, Button } from '@ui-kitten/components';


const BookingsListEntry = (props) => {
  /*Object {
      "cusid": "glJhg6e6vYS9AtXRE40Eo0DL42y1",
      "docId": "I1JOgdMSt8RdqFV6H9uz",
      "end": t {
        "nanoseconds": 0,
        "seconds": 1614438000,
      },
      "guests": "2",
      "restid": "0oSOVkl4hMwsxHtexFJT",
      "start": t {
        "nanoseconds": 0,
        "seconds": 1614434400,
      },
      "status": "ok",
      "tableref": "C3SpKCkToYhIPBhoekJC",
    }*/

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

  const data = props.item.element;
  const callback = props.item.callback;

  const image = {};

  if (data.date.toDate().getHours() > 17) {
    image.uri = "https://www.denverpost.com/wp-content/uploads/2016/04/20150209__20150211_C1_FE11FDROMANCEp2.jpg?w=620"
  } else {
    image.uri = "https://images.unsplash.com/photo-1570894322743-aefb6905a4b5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGluaW5nJTIwdGFibGVzfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80"
  }


  const StatusHeader = () => {
    if (data.status == 'cancelled') {
      return (<Text style={styles.headerTitle}>Status: {capitalize(data.status)}</Text>)
    } else {
      return (<Text style={styles.headerTitle}>Status: {capitalize(data.status)}</Text>)
    }
  }

  const ListHeader = () => {
    return (
      <ImageBackground source={image} style={styles.headerImg}>
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text category='h3' style={styles.headerTitle}>Booking - {data.restname}</Text>
            <Text category='p1' style={styles.headerSubTitle}>{constructDate(data.date.seconds)}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {<StatusHeader />}
            {/*<Text style={styles.headerSubTitle}>Pedro</Text>*/}
          </View>
        </View>
      </ImageBackground>
    );
  }

  const ListContent = () => {
    let dividerCount = data.length - 1;

    if (data.status == 'cancelled') {
      return (
        <View style={styles.listContentContainer, styles.listEntryCanceled}>
          <Divider />
          <View style={{ flexDirection: 'row', margin: 5 }}>
            <Text category='p1' style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Guests: {data.guests}</Text>
            <Text category='p1' style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Time: {constructTime(data.date.seconds)}</Text>
          </View>
          <Divider />
          <TableDescription />
        </View>
      )
    } else {
      return (
        <View style={styles.listContentContainer}>
          <Divider />
          <View style={{ flexDirection: 'row', margin: 5 }}>
            <Text category='p1' style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Guests: {data.guests}</Text>
            <Text category='p1' style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Time: {constructTime(data.date.seconds)}</Text>
          </View>
          <Divider />
          <TableDescription />
        </View>
      );
    }

  }

  const TableDescription = () => {
    return (
      <View style={styles.tableDetails}>
        <Text category='p1' style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Table number: {data.tableNumber}</Text>
      </View>
    );
  }

  const ListButtons = () => {
    const disableCancelButton = data.status == 'cancelled' ? true : false
    return (
      <View style={styles.buttonContainer}>
        <Button disabled={disableCancelButton} style={styles.button} size='medium' status='basic' onPress={() => { callback(data.docId) }}>
          Cancel
              </Button>
        <Button style={styles.button} size='medium' status='basic'>
          Receipt
              </Button>
      </View>
    );
  }

  return (
    <View style={styles.listEntryContainer}>
      <ListHeader />
      <ListContent />
      <ListButtons />
    </View>

  );
}

export default BookingsListEntry

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
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    margin: 5,
  },
  headerSubTitle: {
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
