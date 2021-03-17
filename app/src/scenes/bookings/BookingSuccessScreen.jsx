import React, { useState, useEffect } from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';


export default BookingSuccessScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Text>SUCCESS</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});
