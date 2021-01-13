import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Text, Button, Layout } from '@ui-kitten/components';
import Firebase from '@/utils/firebase'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/actions/auth'

const ProfileScreen = (props) => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{auth.uid}</Text>
        <Text>{auth.name}</Text>

        <Button onPress={handleLogout}>
          Logout
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
  }
})

export default ProfileScreen;
