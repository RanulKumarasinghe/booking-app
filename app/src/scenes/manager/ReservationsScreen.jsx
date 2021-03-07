import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Toggle, Text, Divider, Spinner, Layout, Icon } from '@ui-kitten/components';
import BookingsList from '@/components/BookingsList';
import {clearUserBookings, fetchBookingsByRestaurant, fetchBookingsByRestaurantFiltered } from '@/store/actions/bookings'
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native'



export default BookingListScreen = ({ navigation }) => {
    const auth = useSelector(state => state.auth);
    const resid = useSelector(state => state.staffRestaurant.restaurant.id);
    const dispatch = useDispatch();
    
    const [showLoadingSpinner, setshowLoadingSpinner] = React.useState(true);
    const [filterToggle, setfilterToggle] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    
    let isOffline = auth.uid === undefined;
    const restaurant_bookings = useSelector(state => state.bookings.all_bookings_of_restaurant);

    const sortDates = (array) => {
        array.sort((a,b)=>{
            return a.start.toDate() - b.start.toDate();
        })
        return array;
    }

    const onCheckedChange = () => {
        setfilterToggle(!filterToggle);
        dispatch(clearUserBookings());
        if (!filterToggle) {
            dispatch(fetchBookingsByRestaurant(resid));
        } else {
            dispatch(fetchBookingsByRestaurantFiltered(auth.uid));
        }
    };

    const isFocused = useIsFocused()
    
    React.useEffect(() => {
        if (!isOffline) {
            //dispatch(clearUserBookings());
            setshowLoadingSpinner(true);
            setLoaded(false);
            if (!filterToggle && !loaded) {
                setLoaded(true);
                console.log("Reload no filter");
                dispatch(fetchBookingsByRestaurant(resid));
            } else {
                setLoaded(true);
                console.log("Reload with filter");
                dispatch(fetchBookingsByRestaurantFiltered(auth.uid));
            }
            setTimeout(()=>{
                setshowLoadingSpinner(false);
            },2000);
        }
    } , [isFocused])

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
            const sortedBookings = sortDates(restaurant_bookings);
            console.log(sortedBookings);
            return (
                <View>
                    <BookingsList payload={sortedBookings} />
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

    if (isOffline) {
        return (
            <LoginError />
        )
    } else if (showLoadingSpinner && !loaded) {
        return (
            <LoadingScreen />
        )
    } else {
        return (
            <Layout style={styles.container}>
                <ToggleFilter />
                <ScrollView>
                    <List />
                </ScrollView>
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
