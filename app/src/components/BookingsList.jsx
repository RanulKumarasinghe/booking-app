import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import BookingsListEntry from './BookingsListEntry'
import { List } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBookings } from '@/store/actions/bookings'

const BookingsList = () => {
    const store = useSelector(state => state.bookings);

    const [loaded, setLoaded] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false)
    const [data, setData] = React.useState();

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    if (!loaded) {
        dispatch(fetchAllBookings(auth.uid));
        setData(store.bookings);
        setLoaded(true);
    }

    const handleRefresh = () => {
        setRefreshing(true);
        dispatch(fetchAllBookings(auth.uid));
        setTimeout(function () {
            setData(store.bookings);
            setRefreshing(false);
        }, 500);
    }

    if (auth.uid !== undefined) {
        return (
            <List
                style={styles.container}
                data={data}
                renderItem={BookingsListEntry}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        );
    } else {
        return (<Text>PLEASE LOG IN</Text>)
    }
}

const styles = StyleSheet.create({
    container: {
        maxHeight: "100%",
    },
});

export default BookingsList;