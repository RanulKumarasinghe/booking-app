import React, { useState } from "react";
import { useSelector } from "react-redux";
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

  //The connection to the DB
  const restaurant = useSelector((state) => state.staffRestaurant.restaurant);
  const rewards = firebase.firestore().collection("rewards");
  const auth = useSelector((state) => state.auth);
  const uid = auth.uid;
  const user = auth.name;

  //Converts value from String to Int
  const onTextChange = (money) => {
    var number = parseFloat(money);
    setMoney(number);
    if (number < 500) {
      var pointConversion = number / 10;
      //remove decimals above
      setPoints(pointConversion);
    } else {
      setPoints(50);
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
        {/* <Image
          style={styles.userImage}
          source={{
            uri:
              "https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg",
          }}
        /> */}
        <View>
          <Text style={styles.font}>Hello {user}</Text>
        </View>
        <View style={styles.lineThrough} />
        <View>
          <Text style={styles.font}>
            Enter price of sale in the box bellow to generate code for customer
          </Text>
          <Text style={styles.font}>{points} have been added:</Text>
          <Text style={styles.font}>code for user is: {code}</Text>
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
          maxLength={6}
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
  },

  header: {
    alignContent: "center",
    backgroundColor: "green",
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
