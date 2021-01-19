import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Text, Button, Layout } from '@ui-kitten/components';
import Firebase from '@/utils/firebase'
import { useDispatch } from 'react-redux'
import { login } from '@/store/actions/auth'

const LoginScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(login(email, password));
  }

  const handleResetPassword = () => {
    props.navigation.navigate('Reset Password')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Login</Text>

        {/* {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>} */}

        <Input
          // textStyle={{ ... }}
          value={email}
          onChangeText={email => setEmail(email)}
          label={evaProps => <Text {...evaProps}>Email</Text>}
          // caption={evaProps => <Text {...evaProps}>Caption</Text>}
        />
        <Input
          // textStyle={{ ... }}
          secureTextEntry
          onChangeText={password => setPassword(password)}
          value={password}
          label={evaProps => <Text {...evaProps}>Password</Text>}
          // caption={evaProps => <Text {...evaProps}>Caption</Text>}
        />
        <Button onPress={handleLogin}>
          Login
        </Button>

        <Text onPress={handleResetPassword}>Forgotten Password</Text>

        <Button onPress={() => props.navigation.navigate('Sign Up')}>
          Don't have an account? Sign Up
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

export default LoginScreen;
