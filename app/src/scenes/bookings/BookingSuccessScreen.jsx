import React, { useState, useEffect } from 'react';
import { Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native'


export default BookingSuccessScreen = (props) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused()

    useEffect(() => {
        props.route.params.callback();
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Text>{props.route.params.date.toString()}</Text>
            <Text>{props.route.params.time.toString()}</Text>
            <Text>{props.route.params.guests}</Text>

            <Button>Book Another</Button>
            <Button>View Bookings</Button>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
