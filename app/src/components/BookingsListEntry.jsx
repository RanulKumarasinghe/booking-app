import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { ListItem, Divider, Text } from '@ui-kitten/components';

const BookingsListEntry = (data) => {

    /*"index": 1,
    "item": Object {
      "confirmed": false,
      "cusId": "test",
      "date": "1/12/2021",
      "id": "yFT9gMqoWiTqhcz9FuLU",
      "resName": "Hello World",
      "tables": "5",
      "time": "11:00",
    },*/

    const ListHeader = () => {
        return (
            <View style={styles.header}>
                <Text>BLYAD</Text>
                <Image
                style={styles.Logo}
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />
            </View>
            
        );
    }
    
    return (
        <ListHeader/>
    );
}

const styles = StyleSheet.create({
    header: {
        maxWidth:'90%'
    }, logo: {
        width: 66,
        height: 58,
    },

})

export default BookingsListEntry;