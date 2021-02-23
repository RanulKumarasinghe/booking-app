import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, TextInput } from 'react-native';
import { Text, Button, Layout, ListItem, List, Divider } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { addTable, fetchTables, postTable } from '../../store/actions/bookings';

const AddTableScreen = (props) => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.bookings.tables);

  //placeholder
  const resid = '0oSOVkl4hMwsxHtexFJT';
  const [newTables, setNewTables] = React.useState([]);

  let tableInput;
  let guestsInput;

  if (store.length === 0) {
    dispatch(fetchTables(resid));
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Divider />

        {store.length !== 0 ? <ListComponent props={store} /> : null}

        <View style={styles.inputcontainer}>
          <Text>Table id:</Text>
          <TextInput
            style={styles.input}
            textAlign="center"
            maxLength={20}
            onChangeText={(text) => {
              tableInput = text;
            }}
          />

          <Text>Guests:</Text>
          <TextInput
            style={styles.input}
            keyboardType='number-pad'
            textAlign="center"
            maxLength={1}
            onChangeText={(text) => {
              guestsInput = parseInt(text);
            }}
          />

          <View style={{ flexDirection: 'row' }}>
            <Button style={styles.button} onPress={() => {
              const newTable = { id: tableInput, size: guestsInput };
              setNewTables([...newTables, newTable]);
              dispatch(addTable(newTable));
            }
            }>Add</Button>
            <Button style={styles.button} onPress={() => {
              newTables.forEach((table) => {
                dispatch(postTable(resid, table));
              });
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
        description={'Table_guests: ' + entry.item.size}
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
