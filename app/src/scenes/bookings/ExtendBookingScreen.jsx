import React, { useState, useEffect } from 'react';
import { Text, Button, Divider } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { extendBooking, extendReservation } from '@/store/actions/bookings';

export default ExtendBookingScreen = (props) => {
    const dispatch = useDispatch();
    const extendable = useSelector(state => state.bookings.extend);
    const entry = props.route.params

    useEffect(() => {
        if (extendable) {
            dispatch(extendReservation(entry.details.id));
        }
    }, [extendable]);

    const requestExtension = () => {
        dispatch(extendBooking(entry));
    }

    return (
        <View style={styles.container}>
            {extendable === undefined ?
                <Text>You may request to extend your reservation by 2 hours</Text> :
                extendable ? <Text appearance="hint"> The reservation has been extended! </Text> :
                    <Text appearance="hint"> Sorry the table is already booked </Text>
            }
            <View style={styles.buttonContainer}>
                <Button onPress={() => { requestExtension() }}>Request extension</Button>
                <Button>Go back</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row'
    }
});
