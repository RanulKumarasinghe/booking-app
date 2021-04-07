import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Image, View } from "react-native";
import {
  Icon,
  Button,
  Text,
  List,
  ListItem,
  Modal,
  Card,
} from "@ui-kitten/components";
import { db } from "src/utils/firebase";

const RedeemRewardsScreen = () => {
  //Modal state
  const [visible, setVisible] = useState(false);

  //State holds points returned from firebase
  const [pointsFromUser, setPointsFromUser] = useState(0);

  //Redux to get user
  const auth = useSelector((state) => state.auth);
  //Current users uid taken from the redux state
  const uid = auth.uid;
  //Current users name taken from the redux state
  const name = auth.name;

  //The connection to the DB on firestore
  const user = db.collection("users");

  var prizeOne = 10;
  const decrement = () => {
    if (pointsFromUser >= prizeOne) {
      var number = pointsFromUser - prizeOne;
      setPointsFromUser(number);
      setVisible(true);
    }
  };

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

  const data = new Array(4).fill({
    title: "Title for Item",
    description: "Description for Item",
  });
  const renderItemAccessory = (props) => (
    <Button size="medium" onPress={decrement}>
      Redeem Prize
    </Button>
  );

  const renderItemIcon = (props) => <Icon {...props} name="award" />;

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      //description={`${item.description} ${index + 1}`}
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
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <Card disabled={true}>
            <Text>"Congratulations on your Prize"</Text>
            <Button onPress={() => setVisible(false)}>DISMISS</Button>
          </Card>
        </Modal>
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

  font: {
    alignSelf: "center",
    fontSize: 18,
  },

  button: {
    margin: 2,
    width: "80%",
    alignSelf: "center",
  },

  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default RedeemRewardsScreen;
