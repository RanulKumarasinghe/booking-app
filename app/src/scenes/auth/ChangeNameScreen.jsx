import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import {
  Input,
  Text,
  Button,
  Layout,
  Modal,
  Card,
} from "@ui-kitten/components";
import firebase from "src/utils/firebase";

const ChangeNameScreen = (props) => {
  const [newName, setNewName] = useState("");
  const [visible, setVisible] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);

  const auth = useSelector((state) => state.auth);
  const uid = auth.uid;
  const user = firebase.firestore().collection("users").doc(uid);

  const handleChangeName = () => {
    if (newName && newName.length > 5) {
      return user
        .update({ name: newName })
        .then(() => {
          setNameChanged(true);
          setVisible(true);
          console.log("Name has been changed");
        })
        .catch((error) => {
          setNameChanged(false);
          setVisible(true);
          console.log("Name has not been changed");
        });
    } else {
      setNameChanged(false);
      setVisible(true);
      console.log("Name cannot be empty and must be greater than 6 characters");
    }
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.padding}>
        <Text>
          Input your name in the box bellow and press "change name" to update!
        </Text>

        <Input
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="New Name"
          onChangeText={(newName) => setNewName(newName)}
          value={newName}
        />

        <Text>Enter an new name and press "Change Name" to update</Text>

        <Button onPress={() => handleChangeName()}>Change Name</Button>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <Card
            disabled={true}
            //style={{minWidth:400}}
          >
            {nameChanged ? (
              <Text>Name has been changed to {newName}</Text>
            ) : (
              <Text>
                "Name cannot be empty and must be greater than 6 characters"
              </Text>
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

export default ChangeNameScreen;
