import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import { logout } from "@/store/actions/auth";
import { Avatar } from "react-native-elements";

function ProfileScreen(props) {
  const handleLogout = () => {
    dispatch(logout());
  };

  const onAddRestaurant = () =>
    props.navigation.navigate("Add Restaurant", {
      userID: auth.uid,
    });

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const list = [
    { icon: "sign-out-alt", name: "Sign Out", onPress: handleLogout },
    {
      icon: "question-circle",
      name: "Help",
      description: "Chat with our lovely team",
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userCard}>
        <Avatar
          size="large"
          rounded
          source={{
            uri:
              "https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg",
          }}
        />
        <View style={styles.nameBox}>
          {/* A text wrap need to be applied to the name */}
          <Text style={styles.userNameText}>{auth.name}</Text>

          {/* <Text style={styles.tenantText}>{auth.uid}</Text> */}
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={list}
        renderItem={(entry) => (
          <TouchableOpacity
            style={styles.listEntry}
            onPress={entry.item.onPress}
          >
            <Icon
              style={styles.icon}
              name={entry.item.icon}
              size={30}
              color="#000000"
            />
            <Text style={styles.nameText}>{entry.item.name}</Text>
            <Text style={styles.descriptionText}>
              {" "}
              {entry.item.description}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
      <Button title="Add Restaurant" onPress={onAddRestaurant} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  userCard: {
    flexDirection: "row",
    backgroundColor: "#C4C4C4",
    padding: 20,
    paddingLeft: 30,
    height: 120,
    alignItems: "center",
  },
  nameBox: {
    paddingLeft: 20,
  },
  userNameText: {
    fontSize: 24,
    flexShrink: 1,
  },
  tenantText: {
    fontWeight: "bold",

    fontSize: 18,
  },

  //Settings Entry
  list: {
    backgroundColor: "white",
    flex: 1,
  },
  listEntry: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f542f5",
    flex: 1,
  },
  icon: {
    paddingLeft: 15,
  },
  nameText: {
    fontWeight: "bold",
    paddingLeft: 15,
    fontSize: 18,
  },
  descriptionText: {
    paddingLeft: 18,
  },
});

export default ProfileScreen;
