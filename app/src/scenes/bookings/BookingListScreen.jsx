import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Toggle, Text, Divider, Spinner, Layout, Icon } from '@ui-kitten/components';
import BookingsList from '@/components/BookingsList';
import { fetchBookingsByUser, fetchBookingsByUserFiltered, clearUserBookings, postBookingExpiration } from '@/store/actions/bookings'
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native'



export default BookingListScreen = ({ navigation }) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [showLoadingSpinner, setshowLoadingSpinner] = React.useState(true);
    const [filterToggle, setfilterToggle] = React.useState(true);

    let isOffline = auth.uid === undefined;
    const users_bookings = useSelector(state => state.bookings.users_bookings);

    const sortDates = (array) => {
        array.sort((a, b) => {
            return a.start.toDate() - b.start.toDate();
        })
        return array;
    }

    const onCheckedChange = () => {
        setfilterToggle(!filterToggle);
    };

    const isFocused = useIsFocused()

    useEffect(() => {
        if (!isOffline) {
            dispatch(clearUserBookings());
            setshowLoadingSpinner(true);
            if (filterToggle) {
                dispatch(fetchBookingsByUserFiltered(auth.uid));
            } else {
                dispatch(fetchBookingsByUser(auth.uid));
            }
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
                        <Text appearance='hint'>Filter expired</Text>
                    </Toggle>
                </View>
                <Divider />
            </View>
        );
    }

    const HeaderText = () => {
        return (
            <View>
                <View style={styles.toggleContainer}>
                </View>
                <Divider />
            </View>
        );
    }

    const List = () => {
        if (!showLoadingSpinner && !isOffline) {
            const sortedBookings = sortDates(users_bookings);
            return (<BookingsList payload={sortedBookings} />);
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

    if (isOffline) {
        return (
            <LoginError />
        )
    } else if (showLoadingSpinner) {
        return (
            <LoadingScreen />
        )
    } else {
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
