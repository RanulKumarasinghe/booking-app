import React from 'react';
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native'
import { Divider, Text, Button, Icon } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBookings, postReservationCancelation } from '@/store/actions/bookings'

const BookingsListEntry = (props) => {
    /*Object {
        "cusid": "glJhg6e6vYS9AtXRE40Eo0DL42y1",
        "docId": "I1JOgdMSt8RdqFV6H9uz",
        "end": t {
          "nanoseconds": 0,
          "seconds": 1614438000,
        },
        "guests": "2",
        "restid": "0oSOVkl4hMwsxHtexFJT",
        "start": t {
          "nanoseconds": 0,
          "seconds": 1614434400,
        },
        "status": "ok",
        "tableref": "C3SpKCkToYhIPBhoekJC",
      }*/

    const image = { uri: "https://www.fsrmagazine.com/sites/default/files/styles/story_image_720x430/public/feature-images/state-full-service-restaurant-industry-1554901734.jpg?itok=-EciUerQ" };

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const constructDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }

    const constructTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const time = `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
        return time;
    }

    const data = props.item.element;
    const callback = props.item.callback;

    const StatusHeader = () => {
        if (data.status == 'cancelled') {
            return (<Text style={styles.headerTitleCanceled}>Status: {capitalize(data.status)}</Text>)
        } else {
            return (<Text style={styles.headerTitle}>Status: {capitalize(data.status)}</Text>)
        }
    }

    const ListHeader = () => {
        return (
            <ImageBackground source={image} style={styles.headerImg}>
                <View style={styles.headerContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headerTitle}>Booking - {data.restname}</Text>
                        <Text style={styles.headerSubTitle}>{constructDate(data.start.seconds)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {<StatusHeader />}
                        {/*<Text style={styles.headerSubTitle}>Pedro</Text>*/}
                    </View>
                </View>
            </ImageBackground>
        );
    }

    const ListContent = () => {
        let dividerCount = data.length - 1;

        if (data.status == 'cancelled') {
            return (
                <View style={styles.listContentContainer, styles.listEntryCanceled}>
                    <Divider />
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Guests: {data.guests}</Text>
                        <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Time: {constructTime(data.start.seconds) + "-" + constructTime(data.end.seconds)}</Text>
                    </View>
                    <Divider />
                    <TableDescription />
                </View>
            )
        } else {
            return (
                <View style={styles.listContentContainer}>
                    <Divider />
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Guests: {data.guests}</Text>
                        <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Time: {constructTime(data.start.seconds) + "-" + constructTime(data.end.seconds)}</Text>
                    </View>
                    <Divider />
                    <TableDescription />
                </View>
            );
        }

    }

    const TableDescription = () => {
        return (
            <View style={styles.tableDetails}>
                <Text>Table number: {data.tableref}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex: 1, flexWrap: 'wrap'}}>Attributes: {`Outside, Quiet place, Near a Window, Near the Door`}</Text>
                </View>
            </View>
        );
    }

    const ListButtons = () => {
        return (
            <View style={styles.buttonContainer}>
                <Button style={styles.button} size='medium' status='basic' onPress={() => { callback(data.docId) }}>
                    Cancel
                </Button>
                <Button style={styles.button} size='medium' status='basic'>
                    Receipt
                </Button>
            </View>
        );
    }

    return (
        <View style={styles.listEntryContainer}>
            <ListHeader />
            <ListContent />
            <ListButtons />
        </View>

    );
}

export default BookingsList = (props) => {
    const dispatch = useDispatch();

    const cancelBooking = (bookingid) => {
        dispatch(postReservationCancelation(bookingid));
        props.callback();
    }

    const mappedData = props.payload.map((element) => {
        return ({ element, callback: cancelBooking })
    })

    return (
        //<View style={styles.container}>
        <FlatList
            data={mappedData}
            renderItem={BookingsListEntry}
            keyExtractor={(item) => item.id}
            listKey={(item) => index.toString()}
        />
        //</View>
    );
}

const styles = StyleSheet.create({
    icon: {
        margin: 5,
        width: 20,
        height: 20,
        alignItems: 'center'
    },
    container: {
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 5,
        alignSelf: "stretch",
    },
    listEntryCanceled: {
        backgroundColor: '#fbc3bc'
    },
    listEntryContainer: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5
    },
    headerContainer: {
        height: 85,
        width: '100%',
    },
    headerImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        opacity: 0.75,
    },
    headerTitleCanceled: {
        color: "#e5383b",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        margin: 5,
        textShadowColor: 'white',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 0.1,
            height: 0.1
        }
    },
    headerTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        margin: 5,
        textShadowColor: 'black',
        textShadowRadius: 5,
        textShadowOffset: {
            width: 0.1,
            height: 0.1,
        }
    },
    headerSubTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        margin: 5,
        textShadowColor: 'black',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 0.1,
            height: 0.1,
        }
    },
    listContentContainer: {
        alignSelf: "stretch",
        backgroundColor: '#C4C4C4'
    },
    tableDetails: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: "bold",
    },
    orderPrice: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        padding: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: '50%',
        borderRadius: 0,
        borderLeftWidth: 1,
        borderColor: 'white',
    }
});
