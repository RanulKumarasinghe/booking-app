import React from 'react';
import { StyleSheet, View } from 'react-native'
import { List} from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyBookings } from '@/store/actions/bookings'
import ConfirmBookingsListEntry from './ConfirmBookingListEntry'

export default ConfirmBookingList = () => {
    const store = useSelector(state => state.bookings);
    const dispatch = useDispatch()
    const [loaded, setLoaded] = React.useState(false)
    const resName = 'Happy Ninjal';

    if (!loaded) {
        dispatch(fetchMyBookings(resName));
        setLoaded(true);
    }

    return (
        <List
            style={styles.container}
            data={store.myBookings}
            renderItem={object => <ConfirmBookingsListEntry item={object}/>}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: "100%",
    },
});