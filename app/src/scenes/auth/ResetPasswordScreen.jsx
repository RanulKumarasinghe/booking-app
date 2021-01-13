import React, {useState} from 'react';
import { SafeAreaView, View, Divider, Icon, Layout, Text,} from 'react-native';
import { StyleSheet, TextInput, Button } from 'react-native'
// import {login } from '@/store/actions/auth'
import { useDispatch } from 'react-redux';

const ResetPasswordScreen = (props) => {
  const [email, setEmail] = useState('')

  const handleResetPassword = () => {

  }
  
  return (
    <View style={styles.container}>

      {/* <Image source={require('_assets/icon.png')} /> */}

      <Text>Reset your password</Text>

      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={email => setEmail(email)}
        value={email}
      />

      <Text>By signing up, you agree to our terms of service and privacy policy.</Text>

      <Button title="Send Email" onPress={handleResetPassword} />
    </View>
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

export default ResetPasswordScreen;