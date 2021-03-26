import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Toggle, Text, Divider, Spinner, Layout, Icon } from '@ui-kitten/components';
import BookingsList from '@/components/BookingsList';
import { fetchBookingsByUser, fetchBookingsByUserFiltered, clearUserBookings } from '@/store/actions/bookingOrders'
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native'


export default BookingListScreen = ({ navigation }) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [showLoadingSpinner, setshowLoadingSpinner] = React.useState(true);
    const [filterToggle, setfilterToggle] = React.useState(true);
    const [refresh, setRefresh] = React.useState(false);

    let isOffline = auth.uid === undefined;
    const bookingOrders = useSelector(state => state.bookingOrders.bookingOrders);

    const sortDates = (array) => {
        array.sort((a, b) => {
            return a.date.toDate() - b.date.toDate();
        })
        return array;
    }

    const onCheckedChange = () => {
        setfilterToggle(!filterToggle);
    };

    const doRefresh = () => {
        setRefresh(!refresh);
    };

    const isFocused = useIsFocused()

    useEffect(() => {
        if (!isOffline) {
            dispatch(clearUserBookings());
            setshowLoadingSpinner(true);
            // if (filterToggle) {
            //     dispatch(fetchBookingsByUserFiltered(auth.uid));
            // } else {
            dispatch(fetchBookingsByUser(auth.uid));
            // }
            setTimeout(() => {
                setshowLoadingSpinner(false);
            }, 2000);
        }
    }, [isFocused, filterToggle, refresh]);

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

    const List = () => {
        if (!showLoadingSpinner && !isOffline) {
            // const sortedBookings = sortDates(bookingOrders);
            return (<BookingsList payload={bookingOrders} callback={doRefresh} />);
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
        if (isOffline) {
            return (
                <TouchableOpacity style={styles.loginError} onPress={() => {
                    navigation.navigate(
                        "User", { screen: 'Login' },
                    );
                }}>
                    <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <WarningIcon />
                        <Text style={{ marginTop: 10 }} appearance='hint'>PLEASE LOG IN</Text>
                    </View>
                    <Text style={{ flex: 1 }} appearance='hint'>Tap to redirect</Text>
                </TouchableOpacity>
            );
        } else {
            return (<View></View>)
        }
    }

    const EmptyError = () => {
        if (!isOffline) {
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

    if (isOffline) {
        return (
            <LoginError />
        )
    } else if (showLoadingSpinner) {
        return (
            <LoadingScreen />
        )
    } else if (bookingOrders.length < 1) {
        return (
            <EmptyError />
        )
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
