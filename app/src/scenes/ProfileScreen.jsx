import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Text, Button, Layout } from '@ui-kitten/components';
import Firebase, { db } from '@/utils/firebase'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/actions/auth'

const ProfileScreen = (props) => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  }
  const onAddRestaurant = () => props.navigation.navigate('Add Restaurant', {
    userID: auth.uid
  });

  const test = () => {

    db.collection('restaurants').where("staffIds", "array-contains", auth.uid).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
    })

    // console.log(auth.uid)
    // .get().then(e => {
    //   console.log(e)
    // }).catch(console.warn)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{auth.uid}</Text>
        <Text>{auth.name}</Text>
        <Button onPress={test}>
          Test
        </Button>
        <Button onPress={handleLogout}>
          Logout
        </Button>
        <Button style={styles.button} onPress={onAddRestaurant}>
          Add Restaurant
        </Button>

      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  button: {
    marginTop: 15
  }
})

export default ProfileScreen;
