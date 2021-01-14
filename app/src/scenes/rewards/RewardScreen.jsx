import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Button, Text, TextInput, Image, View, StatusBar} from "react-native";
import { Divider, Icon, Layout } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { State } from "react-native-gesture-handler";
import firebase from 'src/utils/firebase';

const RewardScreen = (props) => {
 
  //1. User inputs amount
  //2. Submit amount to DB
 
  //The mechanism for convrting money to points need to be added
  const [money, updateMoneys] = useState(0);
  const [points, updateMoney] = useState(0);

  function addPoints(){
    //Money should be sent directly to the DB  
   updateMoney(points + 1000);
    firebase
    .firestore()
    .collection('rewards')
    .add({
    points: points
    })
    .then(() => { 
      console.log('User added!');
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <Image
            style={styles.userImage}
            source={{uri:'https://thumbs.dreamstime.com/z/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg'}}
            />
          <View>
            <Text style={styles.font}>Hello Username</Text>
            {/* /manage state to get username above/ */}
          </View>
          <View style={styles.lineThrough}/>
          <View>
            <Text style={styles.font}>Points Earned:</Text>
            <Text style={styles.font}>0000</Text>
          </View>
          <View>
            <Text style={styles.font}>Points Used:</Text>
            <Text style={styles.font}>0000</Text>
          </View>
          <View>
            <Text style={styles.font}>Your Points:</Text>
            <Text style={styles.font}>{points}</Text>
          </View>
          <View>
            <Text style={styles.font}>Money Spent:</Text>
            <Text style={styles.font}>0000</Text>
          </View>
          <View>
            <Text style={styles.font}>Code:</Text>
            <Text style={styles.font}>xnbahs</Text>
          </View>
         
          </View>

        <View>
          <TextInput
            style={{ 
              height: 40, 
              borderColor: 'gray', 
              borderWidth: 1, width:'80%', 
              alignSelf:'center', 
              alignContent:'center'
            }}
            setMoney={price => setMoney(price)}
            value={money}
            keyboardType={'numeric'}
            placeholder='Price of meal here'
          />
          <View style={styles.inputButton}>
            <Button title="Redeem Points" onPress={(money) => addPoints()} />
          </View>
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
    width:'40%',
    height:'20%',
    alignSelf:'center',
  },

  lineThrough:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },

  container:{
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    // paddingTop:'12%'
  },

  header:{
    alignContent:'center',
    backgroundColor:'green',
    // paddingTop:30,
  },

  font:{
    alignSelf:'center',
    fontSize:18,
  },

  button:{
    marginBottom:10,
    borderRadius:50,
    width:'80%',
    alignSelf:'center',
  },

  input:{
    flex:1,
    flexDirection:'row',
    width:'50%',
    height:25,
    paddingLeft:'10%',
  },

  inputButton:{
    marginBottom:10,
    borderRadius:50,
    width:'80%',
    alignSelf:'center',
    height:'50%',
  },
});

export default RewardScreen;
