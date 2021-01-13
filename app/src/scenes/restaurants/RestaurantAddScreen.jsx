import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantDayInput from './RestaurantDayInput'
import {createRestaurant} from '@/store/actions/restaurants';

const MultiTextInput = (props) => {
  return (
    <TextInput
      {...props}
      editable
      maxLength={200}
    />
  );
}

const RestaurantAdd = (props) => {
  const dispatch = useDispatch();

  const navigateBack = () => {
    props.navigation.goBack();
  };
  const [monIsEnabled, setMonIsEnabled] = useState(false);

  const [tuesIsEnabled, setTuesIsEnabled] = useState(false);

  const [wedIsEnabled, setWedIsEnabled] = useState(false);

  const [thursIsEnabled, setThursIsEnabled] = useState(false);

  const [friIsEnabled, setFriIsEnabled] = useState(false);

  const [satIsEnabled, setSatIsEnabled] = useState(false);

  const [sunIsEnabled, setSunIsEnabled] = useState(false);


  const [monOpenValue, onChangeMonOpen] = React.useState('Enter Monday Opening time');
  const [monCloseValue, onChangeMonClose] = React.useState('Enter Monday Closing time');
  const [tuesOpenValue, onChangeTuesOpen] = React.useState('Enter Tuesday Opening time');
  const [tuesCloseValue, onChangeTuesClose] = React.useState('Enter Tuesday Closing time');
  const [wedOpenValue, onChangeWedOpen] = React.useState('Enter Wednesday Opening time');
  const [wedCloseValue, onChangeWedClose] = React.useState('Enter Wednesday Closing time');
  const [thursOpenValue, onChangeThursOpen] = React.useState('Enter Thursday Opening time');
  const [thursCloseValue, onChangeThursClose] = React.useState('Enter Thursday Closing time');
  const [friOpenValue, onChangeFriOpen] = React.useState('Enter Friday Opening time');
  const [friCloseValue, onChangeFriClose] = React.useState('Enter Friday Closing time');
  const [satOpenValue, onChangeSatOpen] = React.useState('Enter Saturday Opening time');
  const [satCloseValue, onChangeSatClose] = React.useState('Enter Saturday Closing time');
  const [sunOpenValue, onChangeSunOpen] = React.useState('Enter Sunday Opening time');
  const [sunCloseValue, onChangeSunClose] = React.useState('Enter Sunday Closing time');

  const [nameValue, onChangeName] = React.useState('Enter name of Restaurant');
  const [typeValue, onChangeType] = React.useState('Enter type');
  const [postCodeValue, onChangePostCode] = React.useState('Enter postCode');
  const [addressValue, onChangeAddress] = React.useState('Enter address of Restaurant');
  const [phoneValue, onChangePhone] = React.useState('Enter phone number');
  const [descriptionValue, onChangeDescription] = React.useState('Enter description of Restaurant');
  const [imageUrlValue, onChangeImageUrl] = React.useState('Enter the imageUrl of Restaurant');


  const addRestaurant = () => {
    console.log('edit');
    dispatch(createRestaurant({
      name: nameValue,
      type: typeValue,
      postCode: postCodeValue,
      address: addressValue,
      phone: phoneValue,
      description: descriptionValue,
      imageUrl: imageUrlValue,
      monday: monIsEnabled,
      monOpen: monOpenValue,
      monClose: monCloseValue,
      tuesday: tuesIsEnabled,
      tuesOpen: tuesOpenValue,
      tuesClose: tuesCloseValue,
      wednesday: wedIsEnabled,
      wedOpen: wedOpenValue,
      wedClose: wedCloseValue,
      thursday: thursIsEnabled,
      thursOpen: thursOpenValue,
      thursClose: thursCloseValue,
      friday: friIsEnabled,
      friOpen: friOpenValue,
      friClose: friCloseValue,
      saturday: satIsEnabled,
      satOpen: satOpenValue,
      satClose: satCloseValue,
      sunday: sunIsEnabled,
      sunOpen: sunOpenValue,
      sunClose: sunCloseValue
    }))
    navigation.navigate('Reward');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View>
      {/* <TopNavigation title="Restaurant Edit" alignment='center' style={styles.header} /> */}
      <ScrollView contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
      }}>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Name: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeName(text)}
          maxLength = {25}
          value = {nameValue}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Type: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeType(text)}
          maxLength = {25}
          value = {typeValue}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>PostCode: </Text>
      <TextInput
          style={styles.textBox}
          autoCompleteType='postal-code'
          onChangeText={text => onChangePostCode(text)}
          maxLength = {25}
          value = {postCodeValue}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Address: </Text>
      <TextInput
          style={styles.textBox}
          autoCompleteType='street-address'
          onChangeText={text => onChangeAddress(text)}
          maxLength = {40}
          value = {addressValue}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Phone: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='phone-pad'
          autoCompleteType='tel'
          onChangeText={text => onChangePhone(text)}
          maxLength = {25}
          value = {phoneValue}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Description: </Text>
      <MultiTextInput
          multiline
          numberOfLines={5}
          style={styles.bigTextBox}
          onChangeText={text => onChangeDescription(text)}
          value = {descriptionValue}
          />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Image URL: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeImageUrl(text)}
          value = {imageUrlValue}
         />
      </View>


      <RestaurantDayInput
        dayName="Monday"
        dayShortName='Mon'
        dayIsEnabled={monIsEnabled}
        onChangeEnable={() => setMonIsEnabled(previousState => !previousState)}
        dayOpenValue={monOpenValue}
        onChangeOpen={text => onChangeMonOpen(text)}
        dayCloseValue={monCloseValue}
        onChangeClose={text => onChangeMonClose(text)}
      />

      <RestaurantDayInput
        dayName="Tuesday"
        dayShortName='Tues'
        dayIsEnabled={tuesIsEnabled}
        onChangeEnable={() => setTuesIsEnabled(previousState => !previousState)}
        dayOpenValue={tuesOpenValue}
        onChangeOpen={text => onChangeTuesOpen(text)}
        dayCloseValue={tuesCloseValue}
        onChangeClose={text => onChangeTuesClose(text)}
      />

      <RestaurantDayInput
        dayName="Wednesday"
        dayShortName='Wed'
        dayIsEnabled={wedIsEnabled}
        onChangeEnable={() => setWedsIsEnabled(previousState => !previousState)}
        dayOpenValue={wedOpenValue}
        onChangeOpen={text => onChangeWedsOpen(text)}
        dayCloseValue={wedCloseValue}
        onChangeClose={text => onChangeWedsClose(text)}
      />

      <RestaurantDayInput
        dayName="Thursday"
        dayShortName='Thurs'
        dayIsEnabled={thursIsEnabled}
        onChangeEnable={() => setThursIsEnabled(previousState => !previousState)}
        dayOpenValue={thursOpenValue}
        onChangeOpen={text => onChangeThursOpen(text)}
        dayCloseValue={thursCloseValue}
        onChangeClose={text => onChangeThursClose(text)}
      />

      <RestaurantDayInput
        dayName="Friday"
        dayShortName='Fri'
        dayIsEnabled={friIsEnabled}
        onChangeEnable={() => setFriIsEnabled(previousState => !previousState)}
        dayOpenValue={friOpenValue}
        onChangeOpen={text => onChangeFriOpen(text)}
        dayCloseValue={friCloseValue}
        onChangeClose={text => onChangeFriClose(text)}
      />

      <RestaurantDayInput
        dayName="Saturday"
        dayShortName='Sat'
        dayIsEnabled={satIsEnabled}
        onChangeEnable={() => setSatIsEnabled(previousState => !previousState)}
        dayOpenValue={satOpenValue}
        onChangeOpen={text => onChangeSatOpen(text)}
        dayCloseValue={satCloseValue}
        onChangeClose={text => onChangeSatClose(text)}
      />

      <RestaurantDayInput
        dayName="Sunday"
        dayShortName='Sun'
        dayIsEnabled={sunIsEnabled}
        onChangeEnable={() => setSunIsEnabled(previousState => !previousState)}
        dayOpenValue={sunOpenValue}
        onChangeOpen={text => onChangeSunOpen(text)}
        dayCloseValue={sunCloseValue}
        onChangeClose={text => onChangeSunClose(text)}
      />

      <View style={styles.buttonSpacing}>
         <Button title="Not yet" onPress={navigateBack} />
         <Button title="Add Restaurant" onPress={addRestaurant} />
      </View>
      </ScrollView>
      </View>
    </SafeAreaView>

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
})
export default RestaurantAdd;
