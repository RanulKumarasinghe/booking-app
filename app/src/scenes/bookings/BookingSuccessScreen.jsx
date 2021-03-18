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

    const navToBookingList = () => {
        props.navigation.navigate('BookingListScreen');
    }

    const navBack = () => {
        props.navigation.goBack()
    }

    const date = props.route.params.date;
    const time = props.route.params.time;
    const guests = props.route.params.guests;

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const addTimePadding = (time) => {
        let hourStr = time.getHours()
        let minuteStr = time.getMinutes()
        if (time.getHours() < 10) {
          hourStr = "0" + hourStr;
        }
        if (time.getMinutes() < 10) {
          minuteStr = "0" + minuteStr;
        }
        return hourStr + ":" + minuteStr;
      }

    const formatDate = (day) => {
        let dayString = day.toString();
        const lastNumber = dayString.slice(dayString.length - 1);
        switch (lastNumber) {
            case "1": {
                dayString = day + "st";
                break;
            } case "2": {
                dayString = day + "nd";
                break;
            } case "3": {
                dayString = day + "rd";
                break;
            } default: {
                dayString = day + "th";
            }
        }
        return dayString;
    }

    return (
        <View style={styles.container}>
            <Text category='h5'>Success!</Text>
            <Text category='p1'>Your table has been booked</Text>

            <View>
                <Text category='p1'>{"For " + formatDate(date.getDate()) + " of " + (monthNames[date.getMonth()]) + " " + date.getFullYear() + ' at ' + addTimePadding(time)}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button style={styles.button} onPress={navBack}>Book Another Table</Button>
                <Button style={styles.button} onPress={navToBookingList}>View My Bookings</Button>
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
        flexDirection: 'row',
    },
    button: {
        maxWidth: '90%',
        margin: 10
    }
});
