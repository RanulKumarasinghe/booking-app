import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Divider } from 'react-native-elements';
import { Text, TopNavigation } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';


const MultiTextInput = (props) => {
  return (
    <TextInput
      {...props}
      editable
      maxLength={200}
    />
  );
}

const RestaurantMenuItem = (props) => {

  const [shouldShow, setShouldShow] = useState(false);

  return (
    <View>
    <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Name* </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={props.onName}
          maxLength = {25}
          value = {props.name}/>
      </View>

      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Price* </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={props.onPrice}
          maxLength = {25}
          value = {props.price}/>
      </View>


      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Description* </Text>
      <MultiTextInput
          multiline
          numberOfLines={5}
          style={styles.bigTextBox}
          onChangeText={props.onDescription}
          value = {props.description}
          />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Image URL* </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={props.onImageUrl}
          value = {props.imageUrl}
         />
      </View>
      </View>

  );
}
const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    flex: 1
  },
  listRow: {
    flexDirection: 'column',
    marginTop: 20,
    marginHorizontal: '10%',
    justifyContent: 'center'
  },
  sizeFont: {
    fontSize: 16
  },
  textBox: {
    height: 25,
    alignContent: 'space-around',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 4,
    width: '100%',
    fontSize: 16,
    textAlign: 'center'
  },
  bigTextBox: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 4,
    width: '100%',
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
  buttonShow: {
    marginTop: '5%',
    marginBottom: '5%',
    width: '80%',
    alignSelf: 'center',
  },
  dividerSpacing: {
    height: 1.5,
    backgroundColor: 'black',
    marginTop: 15
  }
})

export default RestaurantMenuItem;
