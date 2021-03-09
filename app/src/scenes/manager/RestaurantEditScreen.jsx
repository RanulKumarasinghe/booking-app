import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button, Modal, Alert} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
// import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantInput from '../../components/RestaurantInput';
import {updateRestaurant} from '@/store/actions/staffRestaurant';

const RestaurantEdit = (props) => {

  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.staffRestaurant.restaurant);


  const auth = useSelector(state => state.auth);


  const [nameValue, onChangeName] = React.useState(restaurant.name);
  const [typeValue, onChangeType] = React.useState(restaurant.type);
  const [descriptionValue, onChangeDescription] = React.useState(restaurant.description);
  const [imageUrlValue, onChangeImageUrl] = React.useState(restaurant.imageUrl);
  // const [modalVisible, setModalVisible] = useState(false);

  const editRestaurant = () => {
    console.log('edit');
    setTimeout(() => {
    dispatch(updateRestaurant(restaurant.id ,{
      name: nameValue,
      type: typeValue,
      description: descriptionValue,
      imageUrl: imageUrlValue,
      google_id: restaurant.google_id,
    }))
  })
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
        onDescription={text => onChangeDescription(text)}
        description={descriptionValue}
        onImageUrl={text => onChangeImageUrl(text)}
        imageUrl={imageUrlValue}
      />
      <View style={styles.buttonSpacing}>
         <Button title="No Changes" onPress={() => console.log('pressed')} />
         <Button title="Confirm Changes" onPress={editRestaurant} />
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={{alignContent: 'flex-end'}}>
          <Button title="X" onPress={() => setModalVisible(!modalVisible)} />
          </View>
            <Text style={styles.modalText}>Restaurant has been Edited</Text>

       </View>
       </View>
      </Modal> */}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
export default RestaurantEdit;
