import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { ListItem, Card, Modal, Toggle, List, Text, TopNavigation, TopNavigationAction, Divider, Icon } from '@ui-kitten/components';

const BookingsListEntry = (data) => {

    const renderTitle = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={{ flex: 4 }}>
                    <Text style={styles.headerText}>{data.item.restaurantID}</Text>
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

    const formatDate = (date) => {
        let dateFormat = "";

        dateFormat += (date.getDay() + 1) + "/";
        dateFormat += (date.getMonth() + 1) + "/";
        dateFormat += (date.getYear() + 1900);
        dateFormat += "  Time"
        dateFormat += (date.getHours() + 1) + ":";
        dateFormat += (date.getMinutes() + 1);

        return dateFormat;
    }

    const renderDescription = () => {
        return (
            <View style={styles.contentContainer}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Text>Tables: {data.item.tableNum}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        {/*empty*/}
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Text>{data.item.status == true ? "Confirmed" : "Pending"}</Text>
                    </View>
                    <View style={styles.date}>
                        <Text>
                            {formatDate(data.item.time.toDate())}
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