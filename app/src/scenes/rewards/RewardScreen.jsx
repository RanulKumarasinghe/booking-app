import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Button, Text, TextInput, Image, View, StatusBar} from "react-native";
import { Divider, Icon, Layout } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import { State } from "react-native-gesture-handler";

const RewardScreen = (props) => {

  //1. User inputs amount
  //2. Submit amount
  //3. A code is generated
  //4. Code is submited 
  //5. Points redeemed

  //The mechanism for convrting money to points need to be added
  const [moneySpent, UpdateMoneySpent] = useState(0);

  //Current points
  const [points, updatePoints] = useState(0);
  //All points earned never decreases 
  const [pointsEarned, updatePointsEarned] = useState(0);
  //Points that have been used
  //Need a system that uses points
  const [pointsUsed, updatePointsUsed] = useState(0);

    const generateCode = () => {
      function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }
    };

  function addPoints(){
    //Money is converted into points  
   updatePoints(points + 1000);
   updatePointsEarned(points + 1000);
  //  firebase.firestore().collection('rewards')
  //   usersRef
  //       .doc(uid)
  //       .set({user_id: something, points: points + placeholder, code: '12341', status: 'good'})
  //       .then(() => {
  //           // props.navigation.navigate('Login')}
  //           props.navigation.navigate('Login', {user: data})
  //       })
  //       .catch((error) => {
  //           alert(error)
  //       });
  }

  // update(field:  | FieldPath, value: any, moreFieldsAndValues: any[]): Promise<void>;

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
            <Text style={styles.font}>{pointsEarned}</Text>
          </View>
          <View>
            <Text style={styles.font}>Points Used:</Text>
            <Text style={styles.font}>{pointsUsed}</Text>
          </View>
          <View>
            <Text style={styles.font}>Your Points:</Text>
            <Text style={styles.font}>{points}</Text>
          </View>
          <View>
            <Text style={styles.font}>Money Spent:</Text>
            <Text style={styles.font}>{moneySpent}</Text>
          </View>

          <View style={styles.button}>
            <Button title="Use Points" 
                    onPress={() => { console.log('Use Points') }} />
            </View>
            <View style={styles.button}>
              <Button title="Refresh Points" 
                    onPress={() => { console.log('Refresh points') }} />
            </View>
            <View style={styles.button}>
              <Button title="Points History" 
                    onPress={() => { console.log('Loading History') }} />
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
            value={moneySpent}
            keyboardType={'numeric'}
            placeholder='Price of meal here'
          />
          <View style={styles.inputButton}>
            <Button title="Redeem Points" onPress={() => addPoints()} />
            <Button title="Code" onPress={() => generateCode()} />
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
