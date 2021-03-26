import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Alert} from 'react-native';
import { Text, Card, TopNavigation, Modal, Button } from '@ui-kitten/components';
// import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantInput from '../../components/RestaurantInput';
import {updateRestaurant} from '@/store/actions/staffRestaurant';

const RestaurantEdit = (props) => {

  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.staffRestaurant.restaurant);

  const auth = useSelector(state => state.auth);
  const [visible, setVisible] = React.useState(false);


  const [nameValue, onChangeName] = React.useState(restaurant.name);
  const [typeValue, onChangeType] = React.useState(restaurant.type);
  const [descriptionValue, onChangeDescription] = React.useState(restaurant.description);
  const [imageUrlValue, onChangeImageUrl] = React.useState(restaurant.imageUrl);
  // const [modalVisible, setModalVisible] = useState(false);

  const editRestaurant = () => {
    dispatch(updateRestaurant(restaurant.id, {
      id: restaurant.id,
      name: nameValue,
      type: typeValue,
      description: descriptionValue,
      imageUrl: imageUrlValue,
      google_id: restaurant.google_id,
    }))
    setVisible(true)
  };

  const navItem = () => {
    props.navigation.navigate('Profile')
    setVisible(false)
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

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
         <Button title="No Changes" onPress={() => props.navigation.navigate('Profile')} > No Changes </Button>
         <Button title="Confirm Changes" onPress={editRestaurant} > Confirm Changes </Button>
      </View>
      </ScrollView>
      <Modal visible={visible}
      backdropStyle={styles.backdrop}
      style={{ maxHeight: '50%', padding: 10 }}>
        <Card disabled={true}>
          <View style={styles.modalSpacing}>
          <Text>Restaurant Updated!!</Text>
          </View>
          <Button onPress={navItem}>
            Finish
          </Button>
        </Card>
      </Modal>
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
  },
  modalSpacing: {
    marginBottom: '20%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
})
export default RestaurantEdit;
