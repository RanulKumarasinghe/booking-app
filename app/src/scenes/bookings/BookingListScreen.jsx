import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Toggle, Text, Divider, Spinner, Layout, Icon } from '@ui-kitten/components';
import BookingsList from '@/components/BookingsList';
import ConfirmBookingsList from '@/scenes/bookings/components/ConfirmBookingList';
import { fetchAllBookings } from '@/store/actions/bookings'
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';



export default BookingListScreen = ({ navigation }) => {
    const store = useSelector(state => state.bookings);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [showDatePicker, setshowDatePicker] = React.useState(true);
    const [showLoadingSpinner, setshowLoadingSpinner] = React.useState(false);

    const [filterToggle, setfilterToggle] = React.useState(false);
    const [isOffline, setIsOffline] = React.useState(auth.uid === undefined);

    const [date, setDate] = React.useState();
    const [data, setData] = React.useState([]);

    const onCheckedChange = (isChecked) => {
        setfilterToggle(isChecked);
    };

    React.useEffect(() => {
        const reload = navigation.addListener('focus', () => {
            setIsOffline(auth.uid === undefined);
        });
    });

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
                        <Text appearance='hint'>Display expired</Text>
                    </Toggle>
                </View>
                <Divider />
            </View>
        );
    }

    const Datepicker = () => {
        if (showDatePicker && !isOffline) {
            return (
                <View style={styles.datePicker}>
                    <DatePicker
                        style={{ width: 300 }}
                        date={date}
                        mode="date"
                        placeholder="Select a date"
                        format="DD-MM-YYYY"
                        minDate={filterToggle ? new Date() : undefined}
                        maxDate="2021-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            placeholderText: {
                                color: '#939fb6'
                            },
                        }}                  
                        onDateChange={(event, date) => {
                            setshowLoadingSpinner(true);
                            dispatch(fetchAllBookings(auth.uid));
                            setTimeout(function () {
                                setData(store.bookings);
                                setDate(date);
                                setshowLoadingSpinner(false);
                            }, (Math.random() * 1000) + 1500);
                        }
                        }
                    />
                </View>
            );
        } else {
            return (<View></View>)
        }
    }

    const HeaderText = () => {
        return (
            <View>
                <View style={styles.toggleContainer}>
                    <Datepicker />
                </View>
                <Divider />
            </View>
        );
    }

    const List = () => {
        if (!showDatePicker && !showLoadingSpinner && !isOffline) {
            return (
                <View>
                    <BookingsList payload={data} />
                </View>);
        } else {
            return (<View></View>)
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
            return (<View></View>)
        }
    }

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

    //Screen render code
    return (
        <Layout style={styles.container}>
            <ToggleFilter />
            <HeaderText />
            <List />
            <LoadingScreen />
            <LoginError />
        </Layout>
    );
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
        width: 24,
        height: 24,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
