import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { ListItem, Card, Modal, Toggle, List, Text, TopNavigation, TopNavigationAction, Divider, Icon } from '@ui-kitten/components';

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

    const renderTitle = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={{ flex: 4 }}>
                    <Text style={styles.headerText}>{data.item.resName}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={styles.headerText}>Map  </Text>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Icon
                            style={styles.icon}
                            fill='white'
                            name='map-outline'
                        ></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const renderDescription = () => {
        return (
            <View style={styles.contentContainer}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Text>Tables: {data.item.tables}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        {/*empty*/}
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                    <Text>{data.item.confirmed === null ? "Pending" : data.item.confirmed === true ? "Confirmed" : "Rejected"}</Text>
                    </View>
                    <View style={styles.date}>
                        <Text>
                            {`${data.item.date} : ${data.item.time}`}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <ListItem
            title={renderTitle}
            style={styles.listEntry}
            description={renderDescription}
        />
    );
}

//Get dimensions of screen
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        maxHeight: "100%",
    },
    headerContainer: {
        flexDirection: "row",
        backgroundColor: "#0095C5",
        padding: 5,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        color: "white",
        textAlignVertical: "center",
    },
    contentContainer: {
        padding: 10,
        borderBottomColor: '#0095C5',
        borderBottomWidth: 1.5,
    },
    date: {
        textAlign: 'right',
        alignSelf: 'stretch',
    },
    icon: {
        width: 32,
        height: 32,
        paddingRight: 5,
    },
})

export default BookingsListEntry;