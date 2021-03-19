import React, { useState } from "react";
import { SafeAreaView, View, Divider, Icon, Layout, Text } from "react-native";
import { StyleSheet, TextInput, Button } from "react-native";
// import {login } from '@/store/actions/auth'
import { useDispatch } from "react-redux";
import firebase from "src/utils/firebase";

const ResetPasswordScreen = (props) => {
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = () => {
    var user = firebase.auth().currentUser;
    user
      .updatePassword(newPassword)
      .then(() => {
        console.log("Password was changed");
      })
      .catch((error) => {
        console.log("Password was not changed");
      });
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('_assets/icon.png')} /> */}

      <Text>Reset your password</Text>

      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="New Password"
        onChangeText={(newPassword) => setNewPassword(newPassword)}
        value={newPassword}
      />

      <Text>Enter an new password and press "Reset Password" to update</Text>

      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
  },
});

export default ResetPasswordScreen;
