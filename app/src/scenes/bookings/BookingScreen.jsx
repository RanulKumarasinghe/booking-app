import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, TextInput } from "react-native";
import { Divider, Icon, Button, Layout, Datepicker, List, ListItem, Spinner, Modal, Card, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { postReservation, fetchTablesBySize, fetchBookingsBySize, performSchedule, addTime, clearTables, checkTableAvailability } from '@/store/actions/bookings';
import firebase from 'src/utils/firebase';
import { TouchableOpacity } from "react-native";

const BookingScreen = (props) => {
  const all_tables_of_size = useSelector(state => state.bookings.all_tables_of_size);
  const all_scheduled_tables = useSelector(state => state.bookings.all_scheduled_tables);
  const unavailable_tables = useSelector(state => state.bookings.unavailable_tables);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch()

  const [guests, setGuests] = React.useState(undefined);
  const [selectedIndex, setSelectedIndex] = React.useState(undefined);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(false);

  const [buttonGhost, setButtonGhost] = React.useState(false);
  const [visibleGuestModal, setVisibleGuestModal] = React.useState(false);
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [date, setDate] = React.useState(undefined);
  const [time, setTime] = React.useState(undefined);
  const [disableSearch, setDisableSearch] = React.useState(true);
  const [disableReserve, setDisableReserve] = React.useState(true);
  const [showModalSpinner, setShowModalSpinner] = React.useState(false);

  const user = firebase.auth().currentUser.uid;
  let isOffline = auth.uid === undefined;

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const restId = props.route.params.restaurantId;
  const restaurant = restaurants.find(restaurant => restaurant.id === restId);

  if (guests !== undefined && time !== undefined && date !== undefined && disableSearch === true) {
    setDisableSearch(false);
    dispatch(clearTables());
  }

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
        style={{ maxHeight: '30%', padding: 10 }}
      >
        <Card disabled={true}>
          <Text>Select how many guests will be attending</Text>
          <Divider />
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

  const refreshPage = () => {
    dispatch(checkTableAvailability(guests, restId, date));
  }

  const RenderModalLoadingSpinner = () => {
    if (showModalSpinner) {

      const bookingTime = time;
      const bookingDate = date;
      const bookingGuests = guests;

      setTimeout(() => {
        setShowModalSpinner(false);
        setSelectedIndex(undefined);
        setDisableReserve(true);

        props.navigation.navigate("Booking successful", {
          time: bookingTime,
          date: bookingDate,
          guests: bookingGuests,
          callback: refreshPage,
        });

      }, 2500)

      return (
        <View style={styles.container}>
          <Modal
            visible={showModalSpinner}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setShowConfirmationModal(false)}>
            <Card disabled={true} style={styles.modal}>
              <View style={{ minWidth: 300, minHeight: 150, justifyContent: 'center', alignItems: 'center' }}>
                <Text category='p1' style={{marginBottom:15}}>Just a sec...</Text>
                <Spinner />
              </View>
            </Card>
          </Modal>
        </View>);
    } else {
      return (
        <></>
      );
    }
  }

  const RenderConfirmationModal = () => {
    if (showConfirmationModal) {
      return (
        <View style={styles.container}>
          <Modal
            visible={showConfirmationModal}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setShowConfirmationModal(false)}>
            <Card disabled={true} style={styles.modal}>
              <View style={{ alignItems: 'center' }}>
              <Text category='h6' style={{ marginBottom: 5 }}>{`Please confirm the details`}</Text>
              <Text category='p1' style={{marginBottom: 5}}>{restaurant.name}</Text>
                <Text category='p1' style={{ marginBottom: 5 }}>{`Booking table #${all_scheduled_tables[selectedIndex].number}`}</Text>
                <Text category='p1' style={{ marginBottom: 5 }}>{`On ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} at ${addTimePadding(time)}`}</Text>
                <View category='p1' style={styles.confirmModal}>
                  <Button style={styles.modalBtn} onPress={() => {
                   // dispatch(postReservation(all_tables_of_size[selectedIndex].id, restId, user, guests, date, restaurant.name, all_tables_of_size[selectedIndex].number));
                    setShowModalSpinner(true);
                    setShowConfirmationModal(false);
                  }
                  }>
                    Yes
                  </Button>
                  <Button style={styles.modalBtn} onPress={() => {
                    setShowConfirmationModal(false)
                  }
                  }>
                    No
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
            setButtonGhost(false);
          }, 2000);

        }}>Search</Button>
      );
    }
  }

  const RenderReserveButton = () => {
    return (
      <Button style={styles.button} disabled={disableReserve} onPress={() => {
        if (selectedIndex !== undefined) {
          setShowConfirmationModal(true);
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
    if (date !== undefined && time !== undefined && guests !== undefined) {
      let accessory = renderItemAccessoryAvailable;
      if (!item.available) {
        accessory = renderItemAccessoryUnavailable;
      }

      const reference = ['Outside', 'Inside', 'Quiet area', 'Next to a window', 'Next to the door', 'No smoking', 'Smoking allowed'];
      let attrbString = "";
      item.attributeIndexes.forEach((index, i) => {
        if (i === item.attributeIndexes.length - 1) {
          attrbString += reference[index]
        } else {
          attrbString += reference[index] + ", "
        }
      })

      return (
        <ListItem
          title={`Table number - ${all_scheduled_tables[index].number}`}
          description={`Recommended guest capacity: ${item.size}\nDescription: ${attrbString}`}
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
    return <></>
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
        <TouchableOpacity style={styles.loginError} onPress={() => {
          props.navigation.navigate(
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
      <View style={{ flex: 1 }}>
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
            <View style={styles.times}>
              <List
                data={all_scheduled_tables}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
                extraData={selectedIndex}
              />
            </View>
          </View>

          {/*LIST THIS CONTAINER FOR THE LIST*/}

          <View style={styles.submitButton}>
            <RenderSearchButton />
            <RenderReserveButton />
            <RenderConfirmationModal />
            <RenderModalLoadingSpinner />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  confirmModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  smallIcon: {
    marginTop: 2,
    marginRight: 2,
    width: 16,
    height: 16,
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
  text: {
    color: 'white',
    fontWeight: 'bold'
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
    flex: 7,
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
