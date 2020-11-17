import React, { useState } from 'react';
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

const RestaurantEdit = () => {
  const [monIsEnabled, setMonIsEnabled] = useState(false);
  const toggleMonSwitch = () => setMonIsEnabled(previousState => !previousState);
  const [tuesIsEnabled, setTuesIsEnabled] = useState(false);
  const toggleTuesSwitch = () => setTuesIsEnabled(previousState => !previousState);
  const [wedIsEnabled, setWedIsEnabled] = useState(false);
  const toggleWedSwitch = () => setWedIsEnabled(previousState => !previousState);
  const [thursIsEnabled, setThursIsEnabled] = useState(false);
  const toggleThursSwitch = () => setThursIsEnabled(previousState => !previousState);
  const [friIsEnabled, setFriIsEnabled] = useState(false);
  const toggleFriSwitch = () => setFriIsEnabled(previousState => !previousState);
  const [satIsEnabled, setSatIsEnabled] = useState(false);
  const toggleSatSwitch = () => setSatIsEnabled(previousState => !previousState);
  const [sunIsEnabled, setSunIsEnabled] = useState(false);
  const toggleSunSwitch = () => setSunIsEnabled(previousState => !previousState);

  const [value, onChangeText] = React.useState();

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View>
      <TopNavigation title="Restaurant Edit" alignment='center' style={styles.header} />
      <ScrollView contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
      }}>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Name: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeText(text)}
          maxLength = {25}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Type: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeText(text)}
          maxLength = {25}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>PostCode: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeText(text)}
          maxLength = {25}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Address: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeText(text)}
          maxLength = {25}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Phone: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='phone-pad'
          onChangeText={text => onChangeText(text)}
          maxLength = {25}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Description: </Text>
      <MultiTextInput
          multiline
          numberOfLines={5}
          style={styles.bigTextBox}
          onChangeText={text => onChangeText(text)}
          />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Image URL: </Text>
      <TextInput
          style={styles.textBox}
          onChangeText={text => onChangeText(text)}
         />
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Open-Time: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='number-pad'
          onChangeText={text => onChangeText(text)}
          maxLength = {5}/>
      </View>
      <View style={styles.listRow}>
      <Text style={styles.sizeFont}>Closing-Time: </Text>
      <TextInput
          style={styles.textBox}
          keyboardType='number-pad'
          onChangeText={text => onChangeText(text)}
          maxLength = {5}/>
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
         <Button title="Reset Changes" onPress={() => console.log('pressed')} />
         <Button title="Confirm Changes" onPress={() => console.log('pressed')} />
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
