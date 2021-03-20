import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
<<<<<<< HEAD
import { Input, Text, Button, Layout } from "@ui-kitten/components";
=======
import {
  Input,
  Text,
  Button,
  Layout,
  Modal,
  Card,
} from "@ui-kitten/components";
>>>>>>> master
import firebase from "src/utils/firebase";

const ResetPasswordScreen = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleChangePassword = () => {
    var user = firebase.auth().currentUser;
    user
      .updatePassword(newPassword)
      .then(() => {
        setPasswordChanged(true);
        setVisible(true);
        console.log("Password was changed");
      })
      .catch((error) => {
        setPasswordChanged(false);
        setVisible(true);
        console.log("Password was not changed");
      });
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.padding}>
        <Text>Change your password</Text>

        <Input
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="New Password"
          onChangeText={(newPassword) => setNewPassword(newPassword)}
          value={newPassword}
        />

        <Text>Enter an new password and press "Change Password" to update</Text>

        <Button onPress={() => handleChangePassword()}>Change Password</Button>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <Card
            disabled={true}
            //style={{minWidth:400}}
          >
            {passwordChanged ? (
              <Text>Password has been changed</Text>
            ) : (
              <Text>Password has not been changed</Text>
            )}
            <Button onPress={() => setVisible(false)}>DISMISS</Button>
          </Card>
        </Modal>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  padding: {
    padding: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    minWidth: "90%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default ResetPasswordScreen;
