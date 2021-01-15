import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { ListItem, Card, Modal, Toggle, List, Text, TopNavigation, TopNavigationAction, Divider, Icon, Button } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { respondToBooking } from '@/store/actions/bookings'

const ConfirmBookingsListEntry = (data) => {
    const dispatch = useDispatch();
    const [confirmation, setConfirmation] = useState(data.item.item.confirmed)

    const tables = data.item.item.tables;
    const resName = data.item.item.resName;
    const time = data.item.item.time;
    const date = data.item.item.date;

    const confirmButtons = (confirmation) => {
        if (confirmation === null) {
            return (
                <View style={{ flex: 4, flexDirection: 'row' }}>
                    <View style={{ flex: 6, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            dispatch(respondToBooking(data.item.item.id, true));
                            setConfirmation(true)
                        }}>
                            <Icon
                                style={styles.icon}
                                fill='black'
                                name='checkmark'
                            ></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 6, alignItems: 'center', width: '100%'}}>
                    <TouchableOpacity onPress={() => {
                            dispatch(respondToBooking(data.item.item.id, false));
                            setConfirmation(false)
                        }}>
                            <Icon
                                style={styles.icon}
                                fill='black'
                                name='close'
                            ></Icon>
                        </TouchableOpacity>
                    </View >
                </View >
            );
        }
return <View></View>
    }

const renderTitle = () => {
    const confirmButtonsComponent = confirmButtons(confirmation);
    return (
        <View style={confirmation === null ? styles.pendingHeaderContainer : confirmation === true ? styles.confirmedHeaderContainer : styles.rejectedHeaderContainer}>
            <View style={{ flex: 4 }}>
                <Text style={styles.headerText}>{resName}</Text>
            </View>
            {confirmButtonsComponent}
        </View>
    );
}

const renderDescription = () => {
    return (
        <View style={styles.contentContainer}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <Text>People: {tables}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    {/*empty*/}
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <Text>{confirmation === null ? "Pending" : confirmation === true ? "Confirmed" : "Rejected"}</Text>
                </View>
                <View style={styles.date}>
                    <Text>
                        {`${date} : ${time}`}
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
    pendingHeaderContainer: {
        flexDirection: "row",
        backgroundColor: '#66FFFF',
        padding: 5,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    confirmedHeaderContainer: {
        flexDirection: "row",
        backgroundColor: "#B3FF66",
        padding: 5,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    rejectedHeaderContainer: {
        flexDirection: "row",
        backgroundColor: "#FFFF66",
        padding: 5,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        color: "black",
        textAlignVertical: "center",
    },
    contentContainer: {
        padding: 10,
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

export default ConfirmBookingsListEntry;