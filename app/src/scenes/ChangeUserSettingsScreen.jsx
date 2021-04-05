import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Avatar } from "react-native-elements";

const ChangeUserSettingsScreen = (props) => {
  const dispatch = useDispatch();

  const restaurant = useSelector((state) => state.staffRestaurant.restaurant);
  const auth = useSelector((state) => state.auth);

  const [list, setList] = useState([]);

  const handleChangePassword = () => {
    props.navigation.navigate("Change Password");
  };

  const handleChangeName = () => {
    props.navigation.navigate("Change Name");
  };

  //   handleImageChange = () => {

  //   };

  const isManager = !!restaurant;

  if (isManager) {
    const managerList = [
      { icon: "key", name: "Change Password", onPress: handleChangePassword },
      {
        icon: "file-signature",
        name: "Change Name",
        onPress: handleChangeName,
      },
      {
        icon: "portrait",
        name: "Change Profile Picture",
        onPress: () => ({}),
      },
    ];
    useEffect(() => {
      setList(managerList);
    }, []);
  } else {
    const userList = [
      { icon: "key", name: "Change Password", onPress: handleChangePassword },
      {
        icon: "file-signature",
        name: "Change Name",
        onPress: handleChangeName,
      },
      // {
      //   icon: "portrait",
      //   name: "   Change Profile Picture",
      //   onPress: () => ({}),
      // },
    ];
    useEffect(() => {
      setList(userList);
    }, []);
  }

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
          <Text style={styles.userNameText}>{auth.name}</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    fontSize: 18,
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
    backgroundColor: "white",
    flex: 1,
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 2,
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

export default ChangeUserSettingsScreen;
