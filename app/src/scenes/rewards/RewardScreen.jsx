import React, { useState, useSelector } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  View,
  StatusBar,
} from "react-native";
import {
  Divider,
  Icon,
  Layout,
  Button,
  Text,
  Avatar,
} from "@ui-kitten/components";
import firebase from "src/utils/firebase";

const RewardScreen = (props) => {
  //State holds points returned from firebase
  const [points, setpoints] = useState(0);
  //Contains the user input code
  const [code, setCode] = useState();
  //Contains the document name used to track and change field for the code
  const [document, setDocument] = useState();

  //removes spaces from code, just in case it's copy & pasted
  const onTextChange = (code) => {
    var formatCode = code.replace(/\s/g, "");
    setCode(formatCode);
  };

  //The connection to the DB
  const rewards = firebase.firestore().collection("rewards");

  //Current user
  const User = firebase.auth().currentUser;

  //Needs to search DB for Code. If the code is usd return invalid code message
  function redeemCode() {
    //Check if the code is in firebase
    rewards
      .where("code", "==", code)
      .where("codeUsed", "==", false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(setDocument(doc.id), " => ", doc.data());
        });
      });

    rewards
      .doc(document)
      .update({
        codeUsed: true,
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.userImage}
          source={{
            uri:
              "https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg",
          }}
        />
        <View>
          <Text style={styles.font}></Text>
        </View>
        <View style={styles.lineThrough} />
        <View>
          <Text style={styles.font}>Your Points:</Text>
          <Text style={styles.font}>{points}</Text>
          <Text style={styles.font}>Last input code:{code}</Text>
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
          //keyboardType="numeric"
          placeholder="Redeem code here"
          onChangeText={(code) => onTextChange(code)}
          maxLength={6}
        />
        <View>
          <Button
            style={styles.button}
            appearance="filled"
            onPress={redeemCode}
          >
            Redeem Points
          </Button>
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
    margin: 2,
    width: "80%",
    alignSelf: "center",
  },

  inputButton: {
    margin: 2,
    borderRadius: 50,
    width: "80%",
    alignSelf: "center",
    height: "50%",
  },
});

export default RewardScreen;
