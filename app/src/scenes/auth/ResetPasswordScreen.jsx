import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, TextInput } from "react-native";
import { Input, Text, Button, Layout, Divider } from "@ui-kitten/components";
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
    textAlign: "center",
    margin: 20,
    padding: 10,
  },
  textInput: {},
  button: {
    minWidth: "90%",
    marginTop: 15,
    margin: 10,
    borderRadius: 100,
  },
});

export default ResetPasswordScreen;
