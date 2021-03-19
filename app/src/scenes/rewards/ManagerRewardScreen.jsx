import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  StatusBar,
} from "react-native";
import { Divider, Icon, Layout, Button, Input } from "@ui-kitten/components";
import firebase from "src/utils/firebase";

const ManagerRewardScreen = (props) => {
  //State holds the money input by user
  const [money, setMoney] = useState(0);
  //points stored in the DB
  const [points, setPoints] = useState(0);

  const [code, setCode] = useState();

  //This func generates the code
  function makeid() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    setCode(text);
    return text;
  }

  //The connection to the DB
  const restaurant = useSelector((state) => state.staffRestaurant.restaurant);
  const rewards = firebase.firestore().collection("rewards");
  const auth = useSelector((state) => state.auth);
  const uid = auth.uid;
  const user = auth.name;

  //Converts value from String to Int
  const onTextChange = (money) => {
    var number = parseInt(money);
    setMoney(number);
    if (number < 500) {
      var pointConversion = number / 10;
      setPoints(Math.floor(pointConversion));
    } else if (money == null) {
    }
  };

  //The info sent to the DB
  async function generateCode() {
    rewards
      .add({
        money: money,
        points: points,
        restrauntId: restaurant.id,
        employeeId: uid,
        createdAt: new Date(),
        code: makeid(),
        codeUsed: false,
      })
      .then(() => {
        console.log("Points added!");
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
              "https://images.unsplash.com/photo-1510168857767-25918342e7aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1491&q=80",
          }}
        />
        <Text style={styles.font}>Welcome {user}</Text>
        <View style={styles.lineThrough} />
        <Text style={styles.font}>
          This many points have been earned: {points}
          {"\n"}
          <Text style={styles.font}>Code for user is: {code}</Text>
        </Text>
      </View>
      <View>
        <Input
          style={styles.textInput}
          value={money}
          keyboardType="numeric"
          placeholder="Price of meal here"
          onChangeText={(money) => onTextChange(money)}
          maxLength={5}
          //maxLength={5} is based on the average cost of a meal being £15-25
        />
        <View style={styles.inputButton}>
          <Button onPress={generateCode}>Create Points Code</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },

  userImage: {
    // width: "10%",
    // height: "10%",
    // alignSelf: "center",
  },

  lineThrough: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },

  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
  userImage: {
    width: "100%",
    height: "70%",
    alignSelf: "center",
  },
  pointsEr: {},
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    alignSelf: "center",
    alignContent: "center",
  },
});

export default ManagerRewardScreen;
