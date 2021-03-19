import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
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
    <Layout style={styles.container}>
      <View style={styles.padding}>

        <Text>Reset your password</Text>

        <Input
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="New Password"
          onChangeText={(newPassword) => setNewPassword(newPassword)}
          value={newPassword}
        />

        <Text>Enter an new password and press "Reset Password" to update</Text>

        <Button onPress={handleResetPassword}>Reset Password</Button>
      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  padding: {
    padding: 30
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    // margin: 20,
    // ma: 10,
  },
  textInput: {},
  button: {
    minWidth: "90%",
    // marginTop: 15,
    // margin: 10,
    // borderRadius: 100,
  },
});

export default ResetPasswordScreen;
