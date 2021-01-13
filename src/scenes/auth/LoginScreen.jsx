import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Input, Text, Button, Layout } from '@ui-kitten/components';
import Firebase from '@/utils/firebase'


// export const LoginScreen = ({ navigation }) => {
const LoginScreen = (props) => {

  // useEffect(() => {
	// 	Firebase.auth().onAuthStateChanged(user => {
	// 		if (user) {
	// 			this.props.getUser(user.uid)
	// 			if (this.props.user != null) {
	// 				this.props.navigation.navigate('Profile')
	// 			}
	// 		}
	// 	})
  // }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin')
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
  }
})

export default LoginScreen;
