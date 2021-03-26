import React, { useState, setState, useEffect } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Divider } from 'react-native-elements';
import { Text, TopNavigation, Input, Radio, RadioGroup } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import {fetchAllFoodTypes, filterFoodType} from '@/store/actions/foodtypes';

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
      <Input
            style={styles.textInput}
            value={props.name}
            textStyle={{ textAlign: 'center' }}
            maxLength = {25}
            onChangeText={props.onName}
          />
          </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Price* </Text>
      <Input
            style={styles.textInput}
            value={props.price}
            textStyle={{ textAlign: 'center' }}
            maxLength = {25}
            onChangeText={props.onPrice}
          />
          </View>

      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Description*  </Text>
      <Input
            multiline={true}
            style={styles.multilineInput}
            textStyle={{ textAlign: 'center' }}
            value={props.description}
            onChangeText={props.onDescription}
          />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Image URL* </Text>
      <Input
            style={styles.multilineInput}
            multiline={true}
            value={props.imageUrl}
            onChangeText={props.onImageUrl}
          />
          </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Meal Type* </Text>
      <RadioGroup
        selectedIndex={props.menuType}
        onChange={props.onMenuType}>
        <Radio>{props.foodType0}</Radio>
        <Radio>{props.foodType1}</Radio>
        <Radio>{props.foodType2}</Radio>
        <Radio>{props.foodType3}</Radio>
      </RadioGroup>


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
  },
  textInput: {
    height: 25,
  },
  multilineInput: {
    height: 50,
  }
})

export default RestaurantMenuItem;
