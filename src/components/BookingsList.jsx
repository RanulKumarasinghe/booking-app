import firebase from '@/utils/firebase'
import React from 'react';
import { StyleSheet, View } from 'react-native'
import BookingsListEntry from './BookingsListEntry'
import { List, Button, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

export default ReservationList = () => {
    const number = useSelector(state => state.number)
    const dispatch = useDispatch();

    function incrementNumber() {
        dispatch({
            type: "INCREMENT_NUMBER"
        })
    }

    function decrementNumber() {
        dispatch({
            type: "DECREMENT_NUMBER"
        })
    }

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

    return (
        <View>
            <Button onPress={incrementNumber}>

            </Button>
    <Text>{number}</Text>
            <Button onPress={decrementNumber}>

            </Button>
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