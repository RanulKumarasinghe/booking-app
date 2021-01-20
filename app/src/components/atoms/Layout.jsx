import React from "react";
import { SafeAreaView, StyleSheet, View, StatusBar} from "react-native";
import { Layout } from '@ui-kitten/components';

const OurLayout = (props) => {

  return (
    <SafeAreaView style={props.noHeader ? styles.container : []}>
      <Layout>
          {props.children}
      </ Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    // paddingTop:'12%'
  }
});

export default OurLayout;
