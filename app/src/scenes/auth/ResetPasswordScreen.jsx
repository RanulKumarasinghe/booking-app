import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Text, Button, Modal, Card } from "@ui-kitten/components";
import firebase from "src/utils/firebase";

const ResetPasswordScreen = (props) => {
  const [newPassword, setNewPassword] = useState("");

  const [visible, setVisible] = useState(false);

  const handleChangePassword = () => {
    var user = firebase.auth().currentUser;
    user
      .updatePassword(newPassword)
      .then(() => {
        setVisible(true);
        console.log("Password was changed");
      })
      .catch((error) => {
        console.log("Password was not changed");
      });
  };

  return (
    <View style={styles.container}>
      <Text>Reset your password</Text>

      <Input
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="New Password"
        onChangeText={(newPassword) => setNewPassword(newPassword)}
        value={newPassword}
      />

      <Text>Enter an new password and press "Change Password" to update</Text>

      <Button onPress={() => handleChangePassword}>Change Password</Button>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Text>Password has been changed</Text>
          <Button onPress={() => setVisible(false)}>DISMISS</Button>
        </Card>
      </Modal>
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
    minHeight: 192,
  },
  button: {
    minWidth: "90%",
    marginTop: 15,
    margin: 10,
    borderRadius: 100,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default ResetPasswordScreen;
