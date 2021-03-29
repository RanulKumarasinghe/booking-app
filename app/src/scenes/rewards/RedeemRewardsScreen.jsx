import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Image, View, StatusBar } from "react-native";
import { Icon, Button, Text, List, ListItem } from "@ui-kitten/components";
import firebase, { db, FieldValue } from "src/utils/firebase";

const RedeemRewardsScreen = () => {
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

  const data = new Array(4).fill({
    title: "Title for Item",
    description: "Description for Item",
  });
  const renderItemAccessory = (props) => (
    <Button size="medium">Redeem Prize</Button>
  );

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={styles.userImage}
          source={{
            uri:
              "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
          }}
        />
        <View>
          <Text style={styles.font}>Welcome {name}</Text>
        </View>
        <View style={styles.lineThrough} />
        <View>
          <Text style={styles.font}>Points: {pointsFromUser}</Text>
          <List style={styles.container} data={data} renderItem={renderItem} />
        </View>
      </View>
      <View>
        <View></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userImage: {
    width: "100%",
    height: "40%",
    alignSelf: "center",
  },

  lineThrough: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },

  container: {},

  font: {
    alignSelf: "center",
    fontSize: 18,
  },

  button: {
    margin: 2,
    width: "80%",
    alignSelf: "center",
  },
});

export default RedeemRewardsScreen;
