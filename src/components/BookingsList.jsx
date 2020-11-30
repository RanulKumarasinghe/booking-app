import React from 'react';
import { StyleSheet, View } from 'react-native'
import BookingsListEntry from './BookingsListEntry'
import { List} from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBookings } from '@/store/actions/bookings'


const BookingsList = () => {
    const store = useSelector(state => state.bookings);
    const dispatch = useDispatch()
    const [loaded, setLoaded] = React.useState(false)

    if (!loaded) {
        dispatch(fetchAllBookings());
        setLoaded(true);
    }

    return (
        <List
            style={styles.container}
            data={store.bookings}
            renderItem={BookingsListEntry}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: "100%",
    },
});

export default BookingsList;