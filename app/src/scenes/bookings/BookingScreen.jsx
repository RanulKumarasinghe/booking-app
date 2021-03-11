import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";
import { Divider, Icon, Button, Layout, Datepicker, List, ListItem, Spinner, Modal, Card } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { postReservation, fetchTablesBySize, fetchBookingsBySize, performSchedule, addTime, clearTables, checkTableAvailability } from '@/store/actions/bookings';
import firebase from 'src/utils/firebase';

const BookingScreen = (props) => {
  const all_tables_of_size = useSelector(state => state.bookings.all_tables_of_size);
  const all_scheduled_tables = useSelector(state => state.bookings.all_scheduled_tables);
  const unavailable_tables = useSelector(state => state.bookings.unavailable_tables);
  const dispatch = useDispatch()

  const [guests, setGuests] = React.useState(undefined);
  const [dateString, setDateString] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState(undefined);
  const [visible, setVisible] = React.useState(false);

  const [buttonGhost, setButtonGhost] = React.useState(false);
  const [visibleGuestModal, setVisibleGuestModal] = React.useState(false);
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [date, setDate] = React.useState(undefined);
  const [time, setTime] = React.useState(undefined);
  const [disableTime, setDisableTime] = React.useState(true);

  const user = firebase.auth().currentUser.uid;

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const restId = props.route.params.restaurantId;
  const restaurant = restaurants.find(restaurant => restaurant.id === restId);

  React.useEffect(() => {
    dispatch(performSchedule());
    setButtonGhost(false);
  }, [unavailable_tables])

  const SelectGuestsButton = () => {
    let text = guests === 1 ? guests + " Guest" : guests + " Guests";
    if (guests === undefined) {
      text = 'Select guest number'
    }
    return (
      <Button onPress={() => {
        setVisibleGuestModal(true);
      }}>
        {text}
      </Button>
    );
  }

  const GuestModal = () => {
    const data = new Array(20).fill({
      text: 'Guests',
    });

    const renderItem = ({ item, index }) => (
      <ListItem title={`${index + 1} ${item.text} `} onPress={() => {
        setGuests(index + 1);
        setVisibleGuestModal(false);
      }} />
    );

    return (
      <Modal visible={visibleGuestModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisibleGuestModal(false)}
        style={{ maxHeight: '50%', padding: 10 }}
      >
        <Card disabled={true}>
          <Text>Select how many guests will be attending</Text>
          <Divider style={{ marginBottom: 10 }} />
          <List
            style={styles.modalList}
            data={data}
            renderItem={renderItem}
          />
        </Card>
      </Modal>
    );
  }

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (mode === 'date') {
      setDate(selectedDate);
      setDisableTime(false);
    } else if (mode === 'time') {
      const newDate = date;
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
      setTime(selectedDate);
      setDate(newDate);
    }
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');

  };

  const showTimepicker = () => {
    showMode('time');
  };

  React.useEffect(() => {

  }, []);

  const constructDate = (time) => {
    const month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = (date.getDate()) < 10 ? "0" + (date.getDate()) : (date.getDate());
    const paddedTime = (time.length < 5) ? "0" + (time) : (time);
    const fullDate = new Date(date.getFullYear() + "-" + month + "-" + day + "T" + paddedTime);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(time), 0, 0, 0));
  }

  const RenderModal = () => {
    if (visible) {
      return (
        <View style={styles.container}>
          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true} style={styles.modal}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ marginBottom: 5 }}>{`Make booking at`}</Text>
                <Text style={{ marginBottom: 5 }}>{restaurant.name}</Text>
                <Text style={{ marginBottom: 5 }}>{`Table: ${selectedIndex}`}</Text>
                <Text style={{ marginBottom: 10 }}>{`from ${start} to ${end} on ${dateString}`}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Button style={styles.modalBtn} onPress={() => {
                    setVisible(false)
                  }
                  }>
                    No
                  </Button>
                  <Button style={styles.modalBtn} onPress={() => {
                    setVisible(false)
                    // dispatch(postReservation(all_scheduled_tables[selectedIndex].id, restId, user, guests, constructDate(start), constructDate(end), restaurant.name));
                  }
                  }>
                    Yes
                  </Button>
                </View>
              </View>
            </Card>
          </Modal>
        </View>
      );
    } else {
      return (<></>)
    }
  };

  const RenderSearchButton = () => {
    if (buttonGhost) {
      return (
        <Button style={styles.button} appearance="ghost"><Spinner /></Button>
      );
    } else {
      return (
        <Button style={styles.button} onPress={() => {
          setSelectedIndex(undefined);
          setButtonGhost(true);
          if (all_tables_of_size.length > 0) {
            dispatch(clearTables());
          }
          dispatch(fetchTablesBySize(guests, restId));
          dispatch(checkTableAvailability(guests, restId, date));
        }}>Search</Button>
      );
    }
  }

  const renderItemAccessoryAvailable = (props) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Available</Text>
        <Icon
          style={styles.icon}
          fill='#8F9BB3'
          name='checkmark-outline'
        />
      </View>
    );
  }

  const renderItemAccessoryUnavailable = (props) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Unavailable</Text>
        <Icon
          style={styles.icon}
          fill='#8F9BB3'
          name='close-outline'
        />
      </View>
    );
  }

  //LIST ITEM THIS WHERE IT RENDER THE LIST COMPONENTS
  //
  const renderItem = ({ item, index }) => {
    let accessory = renderItemAccessoryAvailable;
    if (!item.available) {
      accessory = renderItemAccessoryUnavailable;
    }

    return (
      <ListItem
        title={`Table number - ${index}`}
        description={`Recommended guest capacity: ${item.size}`}
        style={selectedIndex === index ? { backgroundColor: '#edf1f7' } : undefined}
        accessoryRight={accessory}
        onPress={() => {
          setSelectedIndex(index);
        }}
      />
    );

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <View style={{ flex: 1 }}>
        <View style={{ padding: '2%', alignItems: "center" }}>
          <Text> Restaurant Name: {restaurant.name}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ flexDirection: 'row' }}>
            <Button size="small" style={styles.timeButton} onPress={showDatepicker}>{date !== undefined ? date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() : "Choose a date"}</Button>
            <Button size="small" style={styles.timeButton} disabled={disableTime} onPress={showTimepicker}>{time !== undefined ? time.getHours() + ":" + time.getMinutes() : "Choose a time"}</Button>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              minimumDate={new Date()}
              value={new Date()}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          <GuestModal />
          <SelectGuestsButton />
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
          <RenderSearchButton />
          <Button style={styles.button} onPress={() => {

            dispatch(postReservation(all_tables_of_size[selectedIndex].id, restId, user, guests, date, restaurant.name));
            //if (selectedIndex !== undefined) {
            //  setVisible(true);
            //}
          }}>Reserve</Button>
          <RenderModal />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 200,
  },
  modalBtn: {
    minWidth: '40%',
    marginLeft: 10,
  },
  container: {
    minHeight: 0,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
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
    width: 100,
    height: 50,
    margin: 2.5
  },
  dateTime: {
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    marginLeft: 10,
  },
  times: {
    margin: '2.7%',
    padding: '0.5%',
    flex: 6,
    width: '95%',
    backgroundColor: '#C4C4C4',
    borderRadius: 5
  },
  icon: {
    width: 32,
    height: 32,
  }
});

export default BookingScreen;
