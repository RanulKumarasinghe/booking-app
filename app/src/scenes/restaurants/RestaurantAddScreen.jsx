import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantDayInput from './RestaurantDayInput'
import {createRestaurant} from '@/store/actions/restaurants';
import RestaurantInput from '../../components/RestaurantInput';

const RestaurantAdd = (props) => {
  const dispatch = useDispatch();

  navigateBack = () => {
    props.navigation.goBack();
  };
  const userId = props.route.params.userID;

  const [monIsEnabled, setMonIsEnabled] = useState(false);

  const [tuesIsEnabled, setTuesIsEnabled] = useState(false);

  const [wedIsEnabled, setWedIsEnabled] = useState(false);

  const [thursIsEnabled, setThursIsEnabled] = useState(false);

  const [friIsEnabled, setFriIsEnabled] = useState(false);

  const [satIsEnabled, setSatIsEnabled] = useState(false);

  const [sunIsEnabled, setSunIsEnabled] = useState(false);


  const [monOpenValue, onChangeMonOpen] = React.useState('');
  const [monCloseValue, onChangeMonClose] = React.useState('');
  const [tuesOpenValue, onChangeTuesOpen] = React.useState('');
  const [tuesCloseValue, onChangeTuesClose] = React.useState('');
  const [wedOpenValue, onChangeWedOpen] = React.useState('');
  const [wedCloseValue, onChangeWedClose] = React.useState('');
  const [thursOpenValue, onChangeThursOpen] = React.useState('');
  const [thursCloseValue, onChangeThursClose] = React.useState('');
  const [friOpenValue, onChangeFriOpen] = React.useState('');
  const [friCloseValue, onChangeFriClose] = React.useState('');
  const [satOpenValue, onChangeSatOpen] = React.useState('');
  const [satCloseValue, onChangeSatClose] = React.useState('');
  const [sunOpenValue, onChangeSunOpen] = React.useState('');
  const [sunCloseValue, onChangeSunClose] = React.useState('');

  const [nameValue, onChangeName] = React.useState('');
  const [typeValue, onChangeType] = React.useState('');
  const [postCodeValue, onChangePostCode] = React.useState('');
  const [addressValue, onChangeAddress] = React.useState('');
  const [phoneValue, onChangePhone] = React.useState('');
  const [descriptionValue, onChangeDescription] = React.useState('');
  const [imageUrlValue, onChangeImageUrl] = React.useState('');


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
      sunClose: sunCloseValue,
      staffId: userId
    }))
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View>
      <ScrollView contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
      }}>
      <RestaurantInput
        onName={text => onChangeName(text)}
        name={nameValue}
        onType={text => onChangeType(text)}
        type={typeValue}
        onPostCode={text => onChangePostCode(text)}
        postCode={postCodeValue}
        onAddress={text => onChangeAddress(text)}
        address={addressValue}
        onPhone={text => onChangePhone(text)}
        phone={phoneValue}
        onDescription={text => onChangeDescription(text)}
        description={descriptionValue}
        onImageUrl={text => onChangeImageUrl(text)}
        imageUrl={imageUrlValue}
        monEnabled={monIsEnabled}
        setMonEnabled={() => setMonIsEnabled(previousState => !previousState)}
        monOpen={monOpenValue}
        changeMonOpen={text => onChangeMonOpen(text)}
        monClose={monCloseValue}
        changeMonClose={text => onChangeMonClose(text)}
        tuesEnabled={tuesIsEnabled}
        setTuesEnabled={() => setTuesIsEnabled(previousState => !previousState)}
        tuesOpen={tuesOpenValue}
        changeTuesOpen={text => onChangeTuesOpen(text)}
        tuesClose={tuesCloseValue}
        changeTuesClose={text => onChangeTuesClose(text)}
        wedEnabled={wedIsEnabled}
        setWedEnabled={() => setWedIsEnabled(previousState => !previousState)}
        wedOpen={wedOpenValue}
        changeWedOpen={text => onChangeWedOpen(text)}
        wedClose={wedCloseValue}
        changeWedClose={text => onChangeWedClose(text)}
        thursEnabled={thursIsEnabled}
        setThursEnabled={() => setThursIsEnabled(previousState => !previousState)}
        thursOpen={thursOpenValue}
        changeThursOpen={text => onChangeThursOpen(text)}
        thursClose={thursCloseValue}
        changeThursClose={text => onChangeThursClose(text)}
        friEnabled={friIsEnabled}
        setFriEnabled={() => setFriIsEnabled(previousState => !previousState)}
        friOpen={friOpenValue}
        changeFriOpen={text => onChangeFriOpen(text)}
        friClose={friCloseValue}
        changeFriClose={text => onChangeFriClose(text)}
        satEnabled={satIsEnabled}
        setSatEnabled={() => setSatIsEnabled(previousState => !previousState)}
        satOpen={satOpenValue}
        changeSatOpen={text => onChangeSatOpen(text)}
        satClose={satCloseValue}
        changeSatClose={text => onChangeSatClose(text)}
        sunEnabled={sunIsEnabled}
        setSunEnabled={() => setSunIsEnabled(previousState => !previousState)}
        sunOpen={sunOpenValue}
        changeSunOpen={text => onChangeSunOpen(text)}
        sunClose={sunCloseValue}
        changeSunClose={text => onChangeSunClose(text)}
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
