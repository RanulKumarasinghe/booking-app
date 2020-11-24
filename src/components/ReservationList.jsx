import firebase from '@/utils/firebase'
import React from 'react';
import { StyleSheet } from 'react-native'
import ReservationListEntry from '../components/ReservationListEntry'
import { List } from '@ui-kitten/components';

export default ReservationList = () => {

    const data = Array(3).fill({
        a: '2',
        b: 'd'
    });

    const getBookings = async () => {
        await firebase.firestore().collection("bookings").get().then((snapshot) => {
            const snapshotData = [];
            snapshot.docs.forEach(doc => {
                snapshotData.push(doc.data())
            });
            data = [...snapshotData];
        });
    }

    (function () {
        getBookings();
    })();

    return (
        <List
            style={styles.container}
            data={data}
            renderItem={ReservationListEntry}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: "100%",
    },
});