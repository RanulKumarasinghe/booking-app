import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Divider } from 'react-native-elements';
import { Text, TopNavigation, Input } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantDayInput from '../scenes/restaurants/RestaurantDayInput';


const MultiTextInput = (props) => {
  return (
    <TextInput
      {...props}
      editable
      maxLength={200}
    />
  );
}

const RestaurantInput = (props) => {

  const [shouldShow, setShouldShow] = useState(false);

  return (
    <View style={{ backgroundColor: 'white'}}>
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
      <Text style={styles.sizeFont}>Type* </Text>
      <Input
            style={styles.textInput}
            value={props.type}
            textStyle={{ textAlign: 'center' }}
            maxLength = {25}
            onChangeText={props.onType}
          />
          </View>

      {/* <View style={styles.listRow}>
      <Text style={styles.sizeFont}>PostCode* </Text>
      <TextInput
          style={styles.textBox}
          autoCompleteType='postal-code'
          onChangeText={props.onPostCode}
          maxLength = {25}
          value = {props.postCode}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Address* </Text>
      <TextInput
          style={styles.textBox}
          autoCompleteType='street-address'
          onChangeText={props.onAddress}
          maxLength = {40}
          value = {props.address}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Phone* </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='phone-pad'
          autoCompleteType='tel'
          onChangeText={props.onPhone}
          maxLength = {25}
          value = {props.phone}/>
      </View> */}
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
      {/* <View style={styles.buttonShow}>
      <Button
          title="Hide/Show Opening times"
          onPress={() => setShouldShow(!shouldShow)}
        />
        </View>
      {shouldShow ? (
      <View>
      <RestaurantDayInput
        dayName="Monday"
        dayShortName='Mon'
        dayIsEnabled={props.monEnabled}
        onChangeEnable={props.setMonEnabled}
        dayOpenValue={props.monOpen}
        onChangeOpen={props.changeMonOpen}
        dayCloseValue={props.monClose}
        onChangeClose={props.changeMonClose}
      />

      <RestaurantDayInput
        dayName="Tuesday"
        dayShortName='Tues'
        dayIsEnabled={props.tuesEnabled}
        onChangeEnable={props.setTuesEnabled}
        dayOpenValue={props.tuesOpen}
        onChangeOpen={props.changeTuesOpen}
        dayCloseValue={props.tuesClose}
        onChangeClose={props.changeTuesClose}
      />

      <RestaurantDayInput
        dayName="Wednesday"
        dayShortName='Wed'
        dayIsEnabled={props.wedEnabled}
        onChangeEnable={props.setWedEnabled}
        dayOpenValue={props.wedOpen}
        onChangeOpen={props.changeWedOpen}
        dayCloseValue={props.wedClose}
        onChangeClose={props.changeWedClose}
      />

      <RestaurantDayInput
        dayName="Thursday"
        dayShortName='Thurs'
        dayIsEnabled={props.thursEnabled}
        onChangeEnable={props.setThursEnabled}
        dayOpenValue={props.thursOpen}
        onChangeOpen={props.changeThursOpen}
        dayCloseValue={props.thursClose}
        onChangeClose={props.changeThursClose}
      />

      <RestaurantDayInput
        dayName="Friday"
        dayShortName='Fri'
        dayIsEnabled={props.friEnabled}
        onChangeEnable={props.setFriEnabled}
        dayOpenValue={props.friOpen}
        onChangeOpen={props.changeFriOpen}
        dayCloseValue={props.friClose}
        onChangeClose={props.changeFriClose}
      />

      <RestaurantDayInput
        dayName="Saturday"
        dayShortName='Sat'
        dayIsEnabled={props.satEnabled}
        onChangeEnable={props.setSatEnabled}
        dayOpenValue={props.satOpen}
        onChangeOpen={props.changeSatOpen}
        dayCloseValue={props.satClose}
        onChangeClose={props.changeSatClose}
      />

      <RestaurantDayInput
        dayName="Sunday"
        dayShortName='Sun'
        dayIsEnabled={props.sunEnabled}
        onChangeEnable={props.setSunEnabled}
        dayOpenValue={props.sunOpen}
        onChangeOpen={props.changeSunOpen}
        dayCloseValue={props.sunClose}
        onChangeClose={props.changeSunClose}
      />
      </View> ) : <View></View> } */}
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

export default RestaurantInput;
