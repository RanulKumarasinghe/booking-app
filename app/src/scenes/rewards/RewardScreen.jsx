import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
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
import { firestore } from "firebase";

const RewardScreen = (props) => {
  //State holds points returned from firebase
  const [points, setPoints] = useState(0);
  //Contains the user input code
  const [code, setCode] = useState("");
  //Contains the document name used to track and change field for the code
  const [document, setDocument] = useState("");

  const auth = useSelector((state) => state.auth);
  const uid = auth.uid;
  const user = auth.name;

  //removes spaces from code, just in case it's copy & pasted
  const onTextChange = (code) => {
    var formatCode = code.replace(/\s/g, "");
    setCode(formatCode);
  };

  //The connection to the DB
  const rewards = firebase.firestore().collection("rewards");
  const usersDB = firebase.firestore().collection("users");

  const isFocused = useIsFocused();

  useEffect(() => {
    updatePoints();
  }, [isFocused]);

  function updatePoints() {
    usersDB
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          userPoints = doc.data().points;
          setPoints(userPoints);
        });
      });
  }

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
          {/* FIX:Need to show users points, on load*/}
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
