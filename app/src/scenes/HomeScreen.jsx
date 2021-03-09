import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import {
  Text,
  Button,
  TopNavigation,
  Layout,
  Divider,
} from "@ui-kitten/components";
// import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from "react-redux";

const HomeScreen = ({ navigation }) => {
  const restaurants = useSelector((state) => state.restaurants);

  const test = () => {
    console.log(restaurants);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></Layout>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></Layout>
    </SafeAreaView>
  );
};

export default HomeScreen;
