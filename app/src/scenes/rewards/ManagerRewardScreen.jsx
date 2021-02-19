import React, { useState, useSelector } from "react";
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

  //Takes the money and converts into points to store in the DB
  function pointConvert() {
    var pointConversion = money / 10;
    setPoints(pointConversion);
  }

  //The connection to the DB
  const rewards = firebase.firestore().collection("rewards");

  //Converts value from String to Int
  const onTextChange = (money) => {
    var number = parseFloat(money);
    setMoney(number);
  };

  //The info sent to the DB
  function generateCode() {
    pointConvert();
    rewards
      .add({
        money: money,
        points: points,
        restrauntId: null,
        employeeId: null,
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
              "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png",
          }}
        />
        <View>
          <Text style={styles.font}>Hello Username</Text>
          {/* /manage state to get username above/ */}
        </View>
        <View style={styles.lineThrough} />
        <View>
          <Text style={styles.font}>
            Enter price of meal bllow to generate code
          </Text>
          <Text style={styles.font}>{}: has been added</Text>
          <Text>code for user is: {code}</Text>
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
          value={money}
          keyboardType="numeric"
          placeholder="Price of meal here"
          onChangeText={(money) => onTextChange(money)}
          maxLength={4}
        />
        <View style={styles.inputButton}>
          <Button title="Redeem Points" onPress={generateCode} />
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

export default ManagerRewardScreen;
