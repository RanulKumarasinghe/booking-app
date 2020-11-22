import React from "react";
import { SafeAreaView,StyleSheet, Button, Text, Image, View } from "react-native";
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import Navbar from '../components/Navbar';


const RewardScreen = (props) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TopNavigation style={styles.header}/> 
          <View>
            <Image
            style={styles.userImage}
            source={{uri:'https://thumbs.dreamstime.com/z/user-experience-vector-icon-181327250.jpg'}}
            />
          </View>
          <View>
            <Text>Hello Username</Text>
            {/* /manage state to get username above/ */}
          </View>
          <View style={styles.lineThrough}/>
          <View>
            <Text>Your Points:{"\n"}360</Text>
          </View>
          <View><Button title="Redeem Points" onPress={() => { console.log() }} /></View>
          <View><Button title="Use Points" onPress={() => { console.log() }} /></View>
          <View><Button title="Refresh Points" onPress={() => { console.log() }} /></View>
          <View></View>
        </View>
      </View>
      <View>
        <Navbar selectedIndex={2} navigation={props.navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  userImage:{
    width:'80%',
    height:'45%',
    alignSelf:'center',
  },

  lineThrough:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },

  container:{
    paddingTop:'12%'
  },

  header:{
    alignContent:'center',
    backgroundColor:'green',
    paddingTop:30,
  },
});
 
export default RewardScreen;
