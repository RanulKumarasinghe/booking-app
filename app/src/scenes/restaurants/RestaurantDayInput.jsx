import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Divider } from 'react-native-elements';
import { Text, TopNavigation } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import {createRestaurant} from '@/store/actions/restaurants';

const RestaurantDayInput = (props) => {
  return (
    <>
    <Divider style={styles.dividerSpacing} />
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>{props.dayName}</Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={props.dayIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.onChangeEnable}
        value={props.dayIsEnabled}

      />
      </View>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>{props.dayShortName}-Open: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={props.onChangeOpen}
          maxLength = {5}
          value = {props.dayOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>{props.dayShortName}-Close: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={props.onChangeClose}
          maxLength = {5}
          value = {props.dayCloseValue}
          />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    flex: 1
  },
  listRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center'
  },
  sizeFont: {
    fontSize: 16,
    width: '28%'
  },
  textBox: {
    height: 25,
    alignContent: 'space-around',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 4,
    width: '60%',
    fontSize: 16
  },
  bigTextBox: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 4,
    width: '60%',
    textAlignVertical: 'top'
  },
  switchStyle: {
    width: '60%',
    alignItems: 'flex-start'
  },
  buttonSpacing: {
    marginTop: '15%',
    marginBottom: '20%',
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  dividerSpacing: {
    height: 1.5,
    backgroundColor: 'black',
    marginTop: 15
  }
})
export default RestaurantDayInput;
