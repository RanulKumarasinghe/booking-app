import React from 'react';
import { StyleSheet, View } from 'react-native'
import { List } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyBookings } from '@/store/actions/bookings'
import ConfirmBookingsListEntry from './ConfirmBookingListEntry'

export default ConfirmBookingList = (props) => {
    const store = useSelector(state => state.bookings);
    const dispatch = useDispatch();

    const [loaded, setLoaded] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = React.useState();

    if (!loaded) {
        dispatch(fetchMyBookings(props.restId));
        setData(store.myBookings);
        setLoaded(true);
    }

    console.log(data);

    const handleRefresh = () => {
        setRefreshing(true);
        dispatch(fetchMyBookings(props.restId));
        setTimeout(function () {
            setData(store.myBookings);
            setRefreshing(false);
        }, 500);
    }

    return (
        <List
            style={styles.container}
            data={data}
            renderItem={object => <ConfirmBookingsListEntry item={object} />}
            refreshing={refreshing}
            onRefresh={handleRefresh}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: "100%",
    },
});