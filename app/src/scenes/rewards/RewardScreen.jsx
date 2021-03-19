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
  Input,
} from "@ui-kitten/components";

import firebase, { db, FieldValue } from "src/utils/firebase";

const RewardScreen = (props) => {
  //Contains the user input code
  const [code, setCode] = useState("");

  //State holds points returned from firebase
  const [pointsFromUser, setPointsFromUser] = useState(0);

  //removes spaces from code, just in case it's copy & pasted
  const onTextChange = (code) => {
    var formatCode = code.replace(/\s/g, "");
    setCode(formatCode);
  };

  //Redux to get user
  const auth = useSelector((state) => state.auth);
  //Current users uid taken from the redux state
  const uid = auth.uid;
  //Current users name taken from the redux state
  const name = auth.name;

  //The connection to the DB on firestore
  const rewards = db.collection("rewards");
  const user = db.collection("users");

  const isFocused = useIsFocused();
  useEffect(() => {
    fetchPoints();
  }, [isFocused]);

  //Function loads user points on load
  function fetchPoints() {
    user
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          userPoints = doc.data().points ? doc.data().points : 0;
          setPointsFromUser(userPoints);
        });
      });
  }

  //Needs to search DB for Code. If the code is usd return invalid code message
  function redeemCode() {
    //Check if the code is in firebase
    rewards
      .where("code", "==", code)
      .where("codeUsed", "==", false)
      .get()
      .then((querySnapshot) => {
        const rewardsDocs = querySnapshot.docs;
        if (rewardsDocs.length > 0) {
          rewardsDocs.forEach((doc, index) => {
            //(If a record is returned) the index start at 0
            if (index == 0) {
              rewards
                .doc(doc.id)
                .update({
                  codeUsed: true,
                  customerId: uid,
                })
                .then(() => {
                  console.log(doc.data().points);
                  return user.doc(uid).update({
                    points: FieldValue.increment(doc.data().points),
                  });
                })
                .then(() => fetchPoints())
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            } else {
              console.log("Code not found");
            }
          });
        }
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.userImage}
          source={{
            uri:
              "https://images.unsplash.com/photo-1510168857767-25918342e7aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1491&q=80",
          }}
        />
        <View>
          <Text style={styles.font}>Welcome {name}</Text>
        </View>
        <View style={styles.lineThrough} />
        <View>
          <Text style={styles.font}>Your Points:</Text>
          <Text style={styles.font}>{pointsFromUser}</Text>
        </View>
      </View>

      <View>
        <Input
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
    width: "100%",
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
