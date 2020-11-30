import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';

import {updateRestaurant} from '@/store/actions/restaurants';


const MultiTextInput = (props) => {
  return (
    <TextInput
      {...props}
      editable
      maxLength={200}
    />
  );
}


const RestaurantEdit = (props) => {

  const dispatch = useDispatch();

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const itemId = props.route.params.restaurantID;

  const restaurant = restaurants.find(restaurant => restaurant.id === itemId);

  navigateBack = () => {
    props.navigation.goBack();
  };

  const [monIsEnabled, setMonIsEnabled] = useState(restaurant.monday);

  const [tuesIsEnabled, setTuesIsEnabled] = useState(restaurant.tuesday);

  const [wedIsEnabled, setWedIsEnabled] = useState(restaurant.wednesday);

  const [thursIsEnabled, setThursIsEnabled] = useState(restaurant.thursday);

  const [friIsEnabled, setFriIsEnabled] = useState(restaurant.friday);

  const [satIsEnabled, setSatIsEnabled] = useState(restaurant.saturday);

  const [sunIsEnabled, setSunIsEnabled] = useState(restaurant.sunday);

  const [monOpenValue, onChangeMonOpen] = React.useState(restaurant.monOpen);
  const [monCloseValue, onChangeMonClose] = React.useState(restaurant.monClose);
  const [tuesOpenValue, onChangeTuesOpen] = React.useState(restaurant.tuesOpen);
  const [tuesCloseValue, onChangeTuesClose] = React.useState(restaurant.tuesClose);
  const [wedOpenValue, onChangeWedOpen] = React.useState(restaurant.wedOpen);
  const [wedCloseValue, onChangeWedClose] = React.useState(restaurant.wedClose);
  const [thursOpenValue, onChangeThursOpen] = React.useState(restaurant.thursOpen);
  const [thursCloseValue, onChangeThursClose] = React.useState(restaurant.thursClose);
  const [friOpenValue, onChangeFriOpen] = React.useState(restaurant.friOpen);
  const [friCloseValue, onChangeFriClose] = React.useState(restaurant.friClose);
  const [satOpenValue, onChangeSatOpen] = React.useState(restaurant.satOpen);
  const [satCloseValue, onChangeSatClose] = React.useState(restaurant.satClose);
  const [sunOpenValue, onChangeSunOpen] = React.useState(restaurant.sunOpen);
  const [sunCloseValue, onChangeSunClose] = React.useState(restaurant.sunClose);

  const [nameValue, onChangeName] = React.useState(restaurant.name);
  const [typeValue, onChangeType] = React.useState(restaurant.type);
  const [postCodeValue, onChangePostCode] = React.useState(restaurant.postCode);
  const [addressValue, onChangeAddress] = React.useState(restaurant.address);
  const [phoneValue, onChangePhone] = React.useState(restaurant.phone);
  const [descriptionValue, onChangeDescription] = React.useState(restaurant.description);
  const [imageUrlValue, onChangeImageUrl] = React.useState(restaurant.imageUrl);
  const [openValue, onChangeOpen] = React.useState(restaurant.open);
  const [closeValue, onChangeClose] = React.useState(restaurant.close);

  const editRestaurant = () => {
    console.log('edit');
    dispatch(updateRestaurant({
      id: itemId,
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
    navigation.navigate('RestaurantList');
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View id={restaurant.id}>
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
          onChangeText={text => onChangePostCode(text)}
          maxLength = {25}
          value = {postCodeValue}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Address: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeAddress(text)}
          maxLength = {40}
          value = {addressValue}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Phone: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='phone-pad'
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
          keyboardType='number-pad'
          onChangeText={text => onChangeMonOpen(text)}
          maxLength = {5}
          value = {monOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Mon-Close: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='number-pad'
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
          keyboardType='number-pad'
          onChangeText={text => onChangeTuesOpen(text)}
          maxLength = {5}
          value = {tuesOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Tues-Close: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='number-pad'
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
          keyboardType='number-pad'
          onChangeText={text => onChangeWedOpen(text)}
          maxLength = {5}
          value = {wedOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Wed-Close: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='number-pad'
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
          keyboardType='number-pad'
          onChangeText={text => onChangeThursOpen(text)}
          maxLength = {5}
          value = {thursOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Thurs-Close: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='number-pad'
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
          keyboardType='number-pad'
          onChangeText={text => onChangeFriOpen(text)}
          maxLength = {5}
          value = {friOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Fri-Close: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='number-pad'
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
          keyboardType='number-pad'
          onChangeText={text => onChangeSatOpen(text)}
          maxLength = {5}
          value = {satOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Sat-Close: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='number-pad'
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
          keyboardType='number-pad'
          onChangeText={text => onChangeSunOpen(text)}
          maxLength = {5}
          value = {sunOpenValue}
       />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Sun-Close: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='number-pad'
          onChangeText={text => onChangeSunClose(text)}
          maxLength = {5}
          value = {sunCloseValue}
          />
      </View>
      <View style={styles.buttonSpacing}>
         <Button title="No Changes" onPress={() => console.log('pressed')} />
         <Button title="Confirm Changes" onPress={editRestaurant} />
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
export default RestaurantEdit;
