import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
// import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantInput from '../../components/RestaurantInput';
import {updateRestaurant} from '@/store/actions/restaurants';

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
    navigation.navigate('Rewards');
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View id={restaurant.id}>
      {/* <TopNavigation title="Restaurant Edit" alignment='center' style={styles.header} /> */}
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
