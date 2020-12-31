import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

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
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Monday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={monIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setMonIsEnabled(previousState => !previousState)}
        value={monIsEnabled}

      />
      </View>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Mon-Open: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeMonOpen(text)}
          maxLength = {5}
          value = {monOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Mon-Close: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeMonClose(text)}
          maxLength = {5}
          value = {monCloseValue}
          />
      </View>


      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Tuesday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={tuesIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setTuesIsEnabled(previousState => !previousState)}
        value={tuesIsEnabled}

      />
      </View>
      </View>

      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Tues-Open: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeTuesOpen(text)}
          maxLength = {5}
          value = {tuesOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Tues-Close: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeTuesClose(text)}
          maxLength = {5}
          value = {tuesCloseValue}
          />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Wednesday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={wedIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setWedIsEnabled(previousState => !previousState)}
        value={wedIsEnabled}

      />
      </View>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Wed-Open: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeWedOpen(text)}
          maxLength = {5}
          value = {wedOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Wed-Close: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeWedClose(text)}
          maxLength = {5}
          value = {wedCloseValue}
          />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Thursday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={thursIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setThursIsEnabled(previousState => !previousState)}
        value={thursIsEnabled}

      />
      </View>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Thurs-Open: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeThursOpen(text)}
          maxLength = {5}
          value = {thursOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Thurs-Close: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeThursClose(text)}
          maxLength = {5}
          value = {thursCloseValue}
          />
      </View>

      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Friday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={friIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setFriIsEnabled(previousState => !previousState)}
        value={friIsEnabled}

      />
      </View>
      </View>

      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Fri-Open: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeFriOpen(text)}
          maxLength = {5}
          value = {friOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Fri-Close: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeFriClose(text)}
          maxLength = {5}
          value = {friCloseValue}
          />
      </View>

      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Saturday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={satIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setSatIsEnabled(previousState => !previousState)}
        value={satIsEnabled}

      />
      </View>
      </View>

      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Sat-Open: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeSatOpen(text)}
          maxLength = {5}
          value = {satOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Sat-Close: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeSatClose(text)}
          maxLength = {5}
          value = {satCloseValue}
          />
      </View>

      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Sunday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={sunIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setSunIsEnabled(previousState => !previousState)}
        value={sunIsEnabled}

      />
      </View>
      </View>

      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Sun-Open: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeSunOpen(text)}
          maxLength = {5}
          value = {sunOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Sun-Close: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeSunClose(text)}
          maxLength = {5}
          value = {sunCloseValue}
          />
      </View>
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
