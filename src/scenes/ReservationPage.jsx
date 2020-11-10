import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, List, Text, TopNavigation, TopNavigationAction, Divider, Icon } from '@ui-kitten/components';
import Navbar from '@/components/Navbar';

const data = new Array(8).fill({
    title: 'Item',
});

export default ReservationPage = ({ navigation }) => {

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


    //List render code
    const renderItemHeader = (headerProps, info) => (
        <View {...headerProps}>
            <Text category='h6'>
                {info.item.title} {info.index + 1}
            </Text>
        </View>
    );

    const renderItemFooter = (footerProps) => (
        <Text {...footerProps}>
            By Wikipedia
        </Text>
    );

    const renderItem = (info) => (
        <Card
            style={styles.item}
            status='basic'
            header={headerProps => renderItemHeader(headerProps, info)}
            footer={renderItemFooter}>
            <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
            </Text>
        </Card>
    );
    //List render code


    //Screen render code
    return (
        <View>
            <TopNavigation title='Reservation list' alignment='center' accessoryLeft={BackAction} />
            <Divider />
            <List
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                data={data}
                renderItem={renderItem}
            />
            <View style={{ flex: 0 }}>
                <Navbar selectedIndex={2} navigation={navigation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: '84.6%',
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        marginVertical: 4,
    },
});
