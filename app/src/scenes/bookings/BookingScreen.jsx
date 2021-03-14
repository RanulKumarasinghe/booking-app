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
  const auth = useSelector(state => state.auth);
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
  const [disableSearch, setDisableSearch] = React.useState(true);
  const [disableReserve, setDisableReserve] = React.useState(true);

  const user = firebase.auth().currentUser.uid;
  let isOffline = auth.uid === undefined;

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const restId = props.route.params.restaurantId;
  const restaurant = restaurants.find(restaurant => restaurant.id === restId);

  if (guests !== undefined && time !== undefined && date !== undefined && disableSearch === true) {
    setDisableSearch(false);
  }

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(performSchedule());
      setButtonGhost(false);
    }, 100)
  }, [unavailable_tables])

  const SelectGuestsButton = () => {
    let text = guests === 1 ? guests + " Guest" : guests + " Guests";
    if (guests === undefined) {
      text = 'Select guest number'
    }
    return (
      <Button style={styles.guestButton} onPress={() => {
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
    } else if (mode === 'time') {
      setTime(selectedDate);
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
                <Text style={{ marginBottom: 5 }}>{`Booking table #${all_scheduled_tables[selectedIndex].number}`}</Text>
                <Text style={{ marginBottom: 5 }}>{restaurant.name}</Text>
                <Text style={{ marginBottom: 10 }}>{`On ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Button style={styles.modalBtn} onPress={() => {
                    setVisible(false)
                  }
                  }>
                    No
                  </Button>
                  <Button style={styles.modalBtn} onPress={() => {
                    setVisible(false)
                    setDisableReserve(true);
                    setSelectedIndex(undefined);
                    dispatch(postReservation(all_tables_of_size[selectedIndex].id, restId, user, guests, date, restaurant.name, all_tables_of_size[selectedIndex].number));
                    dispatch(clearTables());
                    setTimeout(() => {
                      dispatch(fetchTablesBySize(guests, restId));
                      dispatch(checkTableAvailability(guests, restId, date));
                    }, 1000)
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
        <Button style={styles.button} disabled={disableSearch} onPress={() => {
          setSelectedIndex(undefined);
          setButtonGhost(true);
          if (all_tables_of_size.length > 0) {
            dispatch(clearTables());
          }

          const newDate = date;
          newDate.setHours(time.getHours());
          newDate.setMinutes(time.getMinutes());
          setDate(newDate);

          dispatch(fetchTablesBySize(guests, restId));
          dispatch(checkTableAvailability(guests, restId, date));
          setTimeout(() => {
            if (all_scheduled_tables.length < 1 && buttonGhost) {
              setButtonGhost(false);
            }
          }, 10000);
        }}>Search</Button>
      );
    }
  }

  const RenderReserveButton = () => {
    return (
      <Button style={styles.button} disabled={disableReserve} onPress={() => {
        if (selectedIndex !== undefined) {
          setVisible(true);
        }
      }}>Reserve</Button>
    );
  }

  const renderItemAccessoryAvailable = (props) => {
    return (
      <View style={{ alignItems: 'center', minWidth: 75 }}>
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
      <View style={{ alignItems: 'center', minWidth: 75 }}>
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
        title={`Table number - ${all_scheduled_tables[index].number}`}
        description={`Recommended guest capacity: ${item.size}`}
        style={selectedIndex === index ? { backgroundColor: '#edf1f7' } : undefined}
        accessoryRight={accessory}
        onPress={() => {
          if (item.available) {
            setSelectedIndex(index);
            setDisableReserve(false);
          }
        }}
      />
    );

  }

  const WarningIcon = () => (
    <Icon
      style={styles.icon}
      fill='#8F9BB3'
      name='alert-triangle-outline'
    />
  );

  const TimeIcon = () => (
    <Icon
      style={styles.smallIcon}
      fill='white'
      name='clock-outline'
    />
  );

  const DateIcon = () => (
    <Icon
      style={styles.smallIcon}
      fill='white'
      name='calendar-outline'
    />
  );

  const LoginError = () => {
    if (isOffline) {
      return (
        <View style={styles.datePicker} >
          <View style={styles.error}>
            <WarningIcon />
          </View>
          <View>
            <Text appearance='hint'>PLEASE LOG IN</Text>
          </View>
        </View>);
    } else {
      return (<View></View>)
    }
  }

  const addTimePadding = () => {
    let hourStr = time.getHours()
    let minuteStr = time.getMinutes()
    if (time.getHours() < 10) {
      hourStr = "0" + hourStr;
    }
    if (time.getMinutes() < 10) {
      minuteStr = "0" + minuteStr;
    }
    return hourStr + ":" + minuteStr;
  }

  if (isOffline) {
    return (<LoginError />)
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Divider />
        <View style={{ flex: 1 }}>
          <View style={{ padding: '2%', alignItems: "center" }}>
            <Text style={{ fontWeight: 'bold' }}>{restaurant.name}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: 'row' }}>
              <Button size="small" style={styles.timeButton} onPress={showDatepicker}>{date !== undefined ? date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() : () => { return <View style={{ flexDirection: 'row' }}><DateIcon /><Text style={styles.text}>Pick a date</Text></View> }}</Button>
              <Button size="small" style={styles.timeButton} onPress={showTimepicker}>{time !== undefined ? addTimePadding() : () => { return <View style={{ flexDirection: 'row' }}><TimeIcon /><Text style={styles.text}>Pick a time</Text></View> }}</Button>
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
          </View>

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
            <RenderReserveButton />
            <RenderModal />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  smallIcon: {
    marginTop:2,
    marginRight:2,
    width: 16,
    height: 16,
  },
  text:{
    color:'white',
    fontWeight:'bold'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 200,
  },
  guestButton: {
    minWidth: 250,
    maxHeight: 20,
    marginTop: 4,
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
  datePicker: {
    marginTop: '1%',
    marginBottom: '1%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    margin: 8,
    minWidth: 100,
  },
  times: {
    margin: '2.7%',
    padding: '0.5%',
    flex: 4,
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
