import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
import Navbar from '@/components/Navbar';
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

const RestaurantEdit = (props) => {

  const restaurants = useSelector(state => state.restaurants.restaurants);
  const itemId = props.route.params.restaurantID;

  const restaurant = restaurants.find(restaurant => restaurant.id === itemId);

  navigateBack = () => {
    props.navigation.goBack();
  };

  const [monIsEnabled, setMonIsEnabled] = useState(restaurant.monday);
  const toggleMonSwitch = () => setMonIsEnabled(previousState => !previousState);
  const [tuesIsEnabled, setTuesIsEnabled] = useState(restaurant.tuesday);
  const toggleTuesSwitch = () => setTuesIsEnabled(previousState => !previousState);
  const [wedIsEnabled, setWedIsEnabled] = useState(restaurant.wednesday);
  const toggleWedSwitch = () => setWedIsEnabled(previousState => !previousState);
  const [thursIsEnabled, setThursIsEnabled] = useState(restaurant.thursday);
  const toggleThursSwitch = () => setThursIsEnabled(previousState => !previousState);
  const [friIsEnabled, setFriIsEnabled] = useState(restaurant.friday);
  const toggleFriSwitch = () => setFriIsEnabled(previousState => !previousState);
  const [satIsEnabled, setSatIsEnabled] = useState(restaurant.saturday);
  const toggleSatSwitch = () => setSatIsEnabled(previousState => !previousState);
  const [sunIsEnabled, setSunIsEnabled] = useState(restaurant.sunday);
  const toggleSunSwitch = () => setSunIsEnabled(previousState => !previousState);

  const [nameValue, onChangeName] = React.useState(restaurant.name);
  const [typeValue, onChangeType] = React.useState(restaurant.type);
  const [postCodeValue, onChangePostCode] = React.useState(restaurant.postCode);
  const [addressValue, onChangeAddress] = React.useState(restaurant.address);
  const [phoneValue, onChangePhone] = React.useState(restaurant.phone);
  const [descriptionValue, onChangeDescription] = React.useState(restaurant.description);
  const [imageUrlValue, onChangeImageUrl] = React.useState(restaurant.imageUrl);
  const [openValue, onChangeOpen] = React.useState(restaurant.open);
  const [closeValue, onChangeClose] = React.useState(restaurant.close);

  editRestaurant = () => {
    console.log('edit Restaurant');
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View id={restaurant.id}>
      <TopNavigation title="Restaurant Edit" alignment='center' style={styles.header} />
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
      <Text style={styles.sizeFont}>Open-Time: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='number-pad'
          onChangeText={text => onChangeOpen(text)}
          maxLength = {5}
          value = {openValue}
          />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Closing-Time: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='number-pad'
          onChangeText={text => onChangeClose(text)}
          maxLength = {5}
          value = {closeValue}
          />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Monday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={monIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleMonSwitch}
        value={monIsEnabled}

      />
      </View>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Tuesday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={tuesIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTuesSwitch}
        value={tuesIsEnabled}

      />
      </View>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Wednesday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={wedIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleWedSwitch}
        value={wedIsEnabled}

      />
      </View>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Thursday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={thursIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleThursSwitch}
        value={thursIsEnabled}

      />
      </View>
      </View>

      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Friday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={friIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleFriSwitch}
        value={friIsEnabled}

      />
      </View>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Saturday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={satIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSatSwitch}
        value={satIsEnabled}

      />
      </View>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Sunday: </Text>
      <View style={styles.switchStyle}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={sunIsEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSunSwitch}
        value={sunIsEnabled}

      />
      </View>
      </View>
      <View style={styles.buttonSpacing}>
         <Button title="No Changes" onPress={() => console.log('pressed')} />
         <Button title="Confirm Changes" onPress={this.editRestaurant} />
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
    marginBottom: '10%',
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
})
export default RestaurantEdit;
