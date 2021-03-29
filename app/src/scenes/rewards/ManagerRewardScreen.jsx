import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
} from "react-native";
import { Button, Input, Modal, Card } from "@ui-kitten/components";
import firebase from "src/utils/firebase";
import QRCode from "react-native-qrcode-svg";

const ManagerRewardScreen = (props) => {
  //State holds the money input by user
  const [money, setMoney] = useState(0);
  //points stored in the DB
  const [points, setPoints] = useState(0);

  const [code, setCode] = useState();

  const [visible, setVisible] = useState(false);

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

  const generateQRCode = () => {
    if (code) {
      setVisible(true);
      console.log("QR Code has been generated");
    } else {
      setVisible(false);
      console.log("Code was empty");
    }
  };

  //Converts value from String to Int
  const onTextChange = (money) => {
    var number = parseInt(money);
    setMoney(number);
    if (number < 500) {
      var pointConversion = number / 10;
      setPoints(Math.floor(pointConversion));
    }
  };

  //The info sent to the DB
  async function generateCode() {
    if (money) {
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
          generateQRCode();
        })
        .catch(function (error) {
          console.error("There was an error, please try again: ", error);
        });
    } else {
      console.error("Money cannot be empty", error);
    }
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
        <View style={styles.button}>
          <Button onPress={generateCode}>Create Points Code</Button>
        </View>
        <View style={styles.button}>
          <Button appearance="filled" onPress={() => setVisible(true)}>
            View QR code
          </Button>
        </View>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <Card disabled={true}>
            <QRCode
              value={code}
              logoSize={50}
              size={250}
              logoBackgroundColor="transparent"
            />
            <Button onPress={() => setVisible(false)}>DISMISS</Button>
          </Card>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
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
    margin: 10,
    borderRadius: 50,
    width: "80%",
    alignSelf: "center",
  },

  input: {
    flex: 1,
    flexDirection: "row",
    width: "50%",
    height: 300,
    paddingLeft: "10%",
  },

  inputButton: {
    flex: 1,
    borderRadius: 50,
    width: "80%",
    alignSelf: "center",
    height: "50%",
    margin: 10,
  },
  userImage: {
    width: "100%",
    height: "60%",
    alignSelf: "center",
  },

  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    alignSelf: "center",
    alignContent: "center",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default ManagerRewardScreen;
