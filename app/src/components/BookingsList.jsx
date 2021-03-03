import React from 'react';
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native'
import { Divider, Text, Button } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBookings } from '@/store/actions/bookings'

const BookingsListEntry = (props) => {
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

    const image = { uri: "https://www.fsrmagazine.com/sites/default/files/styles/story_image_720x430/public/feature-images/state-full-service-restaurant-industry-1554901734.jpg?itok=-EciUerQ" };

    const ListHeader = () => {
        return (
            <ImageBackground source={image} style={styles.headerImg}>
                <View style={styles.headerContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headerTitle}>Booking - McDonalds</Text>
                        <Text style={styles.headerSubTitle}>09-12-2021</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.headerTitle}>Pending</Text>
                        <Text style={styles.headerSubTitle}>Pedro</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }

    const ListContent = () => {
        const data = [{ i: 'Pizza', q: '2' }, { i: 'Sushi', q: '2' }, { i: 'Hamburger', q: '2' }];
        let dividerCount = data.length - 1;
        return (
            <View style={styles.listContentContainer}>
                <Divider />
                <View style={{ flexDirection: 'row', margin: 5 }}>
                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Diners: 1</Text>
                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Time: ASAP</Text>
                </View>
                <Divider />
                {true === true ? <OrderedFoodList data={data}/> : undefined}
                <View style={styles.orderPrice}>
                    <Text>Total: £10:16</Text>
                </View>
            </View>
        );
    }

    const OrderedFoodList = (props) => {
        let dividerCount = props.data.length - 1;
        //Placeholder
        return (
            <View style={styles.orderDetails}>
                    <FlatList
                        data={props.data}
                        renderItem={(order) => {
                            return (
                                <View>
                                    <View style={{ padding: 3 }}>
                                        <Text>{order.item.q + ' - ' + order.item.i}</Text>
                                    </View>
                                    {dividerCount-- !== 0 ? <Divider /> : undefined}
                                </View>
                            );
                        }}
                        keyExtractor={(item) => item.id}
                    />
                    <Divider />
                </View> 
        );
    }

    const ListButtons = () => {
        return (
            <View style={styles.buttonContainer}>
                <Button style={styles.button} size='medium' status='basic'>
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
    /*const store = useSelector(state => state.bookings);

    const [refreshing, setRefreshing] = React.useState(false)
    const [data, setData] = React.useState(props.payload);

    console.log(props);

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    /*const handleRefresh = () => {
        setRefreshing(true);
        dispatch(fetchAllBookings(auth.uid));
        setTimeout(function () {
            setData(store.bookings);
            setRefreshing(false);
        }, 500);
    }*/

    return (
        <View style={styles.container}>
            <FlatList
                data={[{ id: 'A' }, { id: 'B' }, { id: 'C' }]}
                renderItem={BookingsListEntry}
                keyExtractor={(item) => item.id}
                listKey={(item) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 5,
        alignSelf: "stretch",
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
    headerTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        margin: 5,
        textShadowColor: 'black',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 1,
            height: 1
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
            width: 1,
            height: 1
        }
    },
    listContentContainer: {
        alignSelf: "stretch",
        backgroundColor: '#C4C4C4'
    },
    orderDetails: {
        margin: 5,
        marginLeft: 15,
        marginRight: 15
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
        borderRadius:0,
        borderLeftWidth:1,
        borderColor:'white',
    }
});
