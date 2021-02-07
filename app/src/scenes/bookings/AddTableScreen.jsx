import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, TextInput } from 'react-native';
import { Text, Button, Layout, ListItem, List, Divider } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { addTable } from '../../store/actions/bookings';

const AddTableScreen = (props) => {
  const dispatch = useDispatch()
  const [tables, setTables] = React.useState([
    { id: '0', guests: 4 },
    { id: '1', guests: 2 },
    { id: '2', guests: 4 },
    { id: '3', guests: 6 },
    { id: '4', guests: 2 },
    { id: '5', guests: 2 },
    { id: '6', guests: 2 }
  ])
  const resid = '0oSOVkl4hMwsxHtexFJT';
  const table = {};
  const newTables = [];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Divider />

        <ListComponent props={tables} />

        <View style={styles.inputcontainer}>
          <Text>Table id:</Text>
          <TextInput
            style={styles.input}
            textAlign="center"
            maxLength={20}
            onChangeText={(text) => {
              table.id = text;
            }}
          />

          <Text>Guests:</Text>
          <TextInput
            style={styles.input}
            keyboardType='number-pad'
            textAlign="center"
            maxLength={1}
            onChangeText={(text) => {
              table.guests = text;
            }}
          />

          <View style={{ flexDirection: 'row' }}>
            <Button style={styles.button} onPress={() => {
              setTables([...tables, table]);
              newTables.push({id:table.id, guests:table.guests});
              
            }
            }>Add</Button>
            <Button style={styles.button} onPress={() => {

            }}>Publish</Button>
          </View>

        </View>
      </Layout>
    </SafeAreaView>
  );
};

const ListComponent = (data) => {
  const ListEntry = (entry) => {
    return (
      <ListItem
        title={'Table_id: ' + entry.item.id}
        description={'Table_guests: ' + entry.item.guests}
      />
    )
  }
  return (
    <List
      style={styles.listContainer}
      data={data.props}
      renderItem={ListEntry}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    width: '100%',
    maxHeight: '50%',
    flex: 5
  },
  button: {
    marginTop: 15,
    marginLeft: 15,
    width: '50%'
  },
  inputcontainer: {
    flex: 1,
    width: '60%',
    alignItems: 'center'
  },
  input: {
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: '40%',
    fontSize: 16,
  },
})

export default AddTableScreen;
