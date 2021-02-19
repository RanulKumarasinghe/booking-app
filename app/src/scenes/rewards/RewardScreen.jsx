import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  TextInput,
  Image,
  View,
  StatusBar,
} from "react-native";
import { Divider, Icon, Layout } from "@ui-kitten/components";
import firebase from "src/utils/firebase";
import { auth } from "firebase";

const RewardScreen = (props) => {
  //State holds points returned from firebase
  const [points, setpoints] = useState(0);
  const [code, setCode] = useState();

  //removes spaces from code, jst in case it's pasted
  const onTextChange = (code) => {
    var formatCode = code.replace(/\s/g, "");
    setCode(formatCode);
  };

  //The connection to the DB
  const rewards = firebase.firestore().collection("rewards");

  //Current user
  const currentUser = firebase.auth().currentUser.uid;

  //Needs to search DB for Code
  function redeemCode() {
    //Check if the code is in firebase
    // var codeSearch =
    // rewards.where("code", "==", code);
    // rewards.where("codeUsed", "==", false);
    // codeSearch.get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, ' => ', doc.data());
    // });

    //var query = rewards.where("state", "==", "CA");
    rewards
      .update({})
      .then(() => {
        console.log("code redeemed");
      })
      .catch(function (error) {
        console.error("There was an error, please try again: ", error);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.userImage}
          source={{
            uri:
              "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png",
          }}
        />
        <View>
          <Text style={styles.font}>
            {currentUser} // {auth.uid}
          </Text>
        </View>
        <View style={styles.lineThrough} />
        <View>
          <Text style={styles.font}>Your Points:</Text>
          <Text style={styles.font}>{points}</Text>
        </View>
      </View>

      <View>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "80%",
            alignSelf: "center",
            alignContent: "center",
          }}
          value={code}
          keyboardType="numeric"
          placeholder="Redeem code here"
          onChangeText={(code) => onTextChange(code)}
          maxLength={4}
        />
        <View style={styles.inputButton}>
          <Button title="Redeem Points" onPress={redeemCode} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  userImage: {
    width: "40%",
    height: "60%",
    alignSelf: "center",
  },

  lineThrough: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },

  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // paddingTop:'12%'
  },

  header: {
    alignContent: "center",
    backgroundColor: "green",
    // paddingTop:30,
  },

  font: {
    alignSelf: "center",
    fontSize: 18,
  },

  button: {
    marginBottom: 10,
    borderRadius: 50,
    width: "80%",
    alignSelf: "center",
  },

  input: {
    flex: 1,
    flexDirection: "row",
    width: "50%",
    height: 25,
    paddingLeft: "10%",
  },

  inputButton: {
    marginBottom: 10,
    borderRadius: 50,
    width: "80%",
    alignSelf: "center",
    height: "50%",
  },
});

export default RewardScreen;
