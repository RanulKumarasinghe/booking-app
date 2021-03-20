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
  const [NameChanged, setNameChanged] = useState(false);

  const auth = useSelector((state) => state.auth);
  const uid = auth.uid;
  const user = firebase.firestore().collection("users").doc(uid);

  const handleChangeName = () => {
    if (newName) {
      return user
        .update({ name: NewName })
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
      console.log("Name cannot be empty");
    }
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.padding}>
        <Text>
          Input your name update in the box belowand press "change name"
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
            {NameChanged ? (
              <Text>Name has been changed</Text>
            ) : (
              <Text>Name has not been changed</Text>
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
