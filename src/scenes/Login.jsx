import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet, TextInput, Button } from 'react-native'

import auth from "@react-native-firebase/auth"

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

// export const LoginScreen = ({ navigation }) => {
export default class LoginScreen extends React.Component {

  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin')
  }

  navigateBack = () => {
    props.navigation.goBack();
  };

  BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={this.navigateBack} />
  );

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation title='MyApp' alignment='center' accessoryLeft={this.BackAction} />
        <Divider />
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Login</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button title="Login" onPress={this.handleLogin} />
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </Layout>
      </SafeAreaView>
    );
  }
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