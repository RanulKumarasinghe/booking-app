
import React, {useState} from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Input, Text, Button, Layout } from '@ui-kitten/components';
import { useDispatch } from 'react-redux'
import { signUp } from '@/store/actions/auth'

const SignUp = (props) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    dispatch(signUp(fullName, email, password));
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text>Sign Up</Text>
        {/* {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>} */}
        <Input
          // textStyle={{ ... }}
          onChangeText={fullName => setFullName(fullName)}
          value={fullName}
          label={evaProps => <Text {...evaProps}>Name</Text>}
          // caption={evaProps => <Text {...evaProps}>Caption</Text>}
        />

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

        <Input
          // textStyle={{ ... }}
          secureTextEntry
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          value={confirmPassword}
          label={evaProps => <Text {...evaProps}>Confirm Password</Text>}
          // caption={evaProps => <Text {...evaProps}>Caption</Text>}
        />
        <Button onPress={handleSignUp}>
          {evaProps => <Text {...evaProps}>Sign Up</Text>}
        </Button>

        {/* <Button title="Sign Up" onPress={handleSignUp} /> */}
        <Text onPress={() => props.navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
      </Layout>
    </SafeAreaView>
  )
}


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


export default SignUp;