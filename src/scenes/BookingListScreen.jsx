import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Card, Modal, Toggle, Text, TopNavigation, TopNavigationAction, Divider, Icon } from '@ui-kitten/components';
import BookingsList from '@/components/BookingsList';

export default BookingListScreen = ({ navigation }) => {
    const [checked, setChecked] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
    };

    //Top Back navigation Code
    navigateBack = () => {
        navigation.goBack();
    };

    const BackIcon = (props) => (
        <Icon {...props} name='arrow-back' />
    );

    BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );
    //Top Back navigation Code

    //Screen render code
    return (
        <View style={{ flex: 1 }}>
            <TopNavigation title='Reservation list' alignment='center' accessoryLeft={BackAction} />
            <Divider />
            <View style={styles.toggleContainer}>
                <Toggle style={styles.toggleElement} checked={checked} onChange={onCheckedChange}>
                    Display expired?
                </Toggle>
            </View>
            <BookingsList />
            <Modal
                visible={visible}
                backdropStyle={styles.modalBackDrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true} style={styles.modalContainer}>
                    <Text>Map in progress...</Text>
                </Card>
            </Modal>
        </View>
    );
};


//Get dimensions of screen
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        maxHeight: "100%",
    },
    listEntry: {
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
    toggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    toggleElement: {
        paddingLeft: 5,
        flex: 1,
        textAlign: "center",
    },
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: width - 45,
        height: height - 45,
    },
    modalBackDrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});
