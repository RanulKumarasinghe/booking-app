import firebase from '@/utils/firebase'
import React from 'react';
import { StyleSheet, View } from 'react-native'
import BookingsListEntry from './BookingsListEntry'
import { List, Button, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

export default ReservationList = () => {
    //const String = useSelector(state => state.test)
    //const dispatch = useDispatch();

    const getBookings = async () => {
        await firebase.firestore().collection("bookings").get().then((snapshot) => {
            const snapshotData = [];
            snapshot.docs.forEach(doc => {
                snapshotData.push(doc.data())
            });
            data = [...snapshotData];
        });
    }

    return (
        <View>
            
        </View>

        //<List
        //    style={styles.container}
        //    data={data}
        //    //renderItem={BookingsListEntry}
        /// />
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: "100%",
    },
});