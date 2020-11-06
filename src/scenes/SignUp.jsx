// SignUp.js
import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from '@/utils/firebase'

const SignUp = (props) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
  }
  firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
          const uid = response.user.uid
          const data = {
              id: uid,
              email,
              fullName,
          };
          const usersRef = firebase.firestore().collection('users')
          usersRef
              .doc(uid)
              .set(data)
              .then(() => {
                  // props.navigation.navigate('Login')}
                  props.navigation.navigate('Login', {user: data})
              })
              .catch((error) => {
                  alert(error)
              });
      })
      .catch((error) => {
          alert(error)
  });
  
  }
  

    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {/* {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>} */}
        <TextInput
          placeholder="Name"
          autoCapitalize="words"
          style={styles.textInput}
          onChangeText={fullName => setFullName(fullName)}
          value={fullName}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => setEmail(email)}
          value={email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => setPassword(password)}
          value={password}
        />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          autoCapitalize="exp"
          style={styles.textInput}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          value={confirmPassword}
        />
        <Button title="Sign Up" onPress={handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => props.navigation.navigate('Login')}
        />
      </View>
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