import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, TextInput } from 'react-native'
import { Input, Text, Button, Layout, Divider } from '@ui-kitten/components';
// import {login } from '@/store/actions/auth'
import { useDispatch } from 'react-redux';

const ResetPasswordScreen = (props) => {
  const [email, setEmail] = useState('')

  const handleResetPassword = () => {

  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>

        <View style={styles.container}>
          {/* <Image source={require('_assets/icon.png')} /> */}
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 2 }}>
            <Input
              style={styles.textInput}
              value={email}
              onChangeText={email => setEmail(email)}
              label={<Text category='s1' appearance="hint" >Email</Text>}
            />
            <Text style={{ textAlign: 'center' }}>By signing up, you agree to our terms of service and privacy policy.</Text>
            <Button style={styles.button} onPress={handleResetPassword}> Send Email </Button>
          </View>
        </View>
    </Layout>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 20,
    padding: 10,
  },
  textInput: {
  },
  button: {
    minWidth: "90%",
    marginTop: 15,
    margin: 10,
    borderRadius: 100
  },
})

export default ResetPasswordScreen;