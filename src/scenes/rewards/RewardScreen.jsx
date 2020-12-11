import React, {useState} from "react";
import { SafeAreaView, StyleSheet, Button, Text, TextInput, Image, View } from "react-native";
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSelector } from 'react-redux';

const RewardScreen = (props) => {
//This needs additional logic for example  useSelector(state => state.rewards.points);
//points come from the initial state in the reducer
//const currentReward = useSelector(state => state.rewards);

//generating
const [money, setMoney] = useState(0);
//redeem
const [code, setCode] = useState('');
  //   return (
  //     <TextInput
  //       style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
  //       setMoney={price => setMoney(price)}
  //       value={money}
  //     />
  //   );
  

 

  // const generateCode = async () => {
  //   // Identify the inputs - money, restaurant_id
  //   if(money >= 0 && restaurant_id === !null ){
  //     function getRandomArbitrary(min, max) {
  //       return Math.random() * (max - min) + min;
  //     }
  //     getRandomArbitrary = setCode;
      
  //     //Put setcode in a callBack so it do it doesnt reload
  //   }

  //   console.log(money)
  //   // Should return a code
  // }

  // const redeemCode = async (code) => {
  //   // Identify the inputs - code

  //   console.log(code)
  //   //Should say it's okay when points are added
  // }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <TopNavigation style={styles.header}/> */}
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
            <Text style={styles.font}>2000</Text>
          </View>
          <View>
            <Text style={styles.font}>Points Used:</Text>
            <Text style={styles.font}>0000</Text>
          </View>
          <View>
            <Text style={styles.font}>Your Points:</Text>
            <Text style={styles.font}>3560</Text>
          </View>
          <View style={styles.button}><Button title="Redeem Points" onPress={() => { console.log() }} /></View>
          <View style={styles.button}><Button title="Use Points" onPress={() => { console.log() }} /></View>
          <View style={styles.button}><Button title="Refresh Points" onPress={() => { console.log() }} /></View>
          <View style={styles.button}><Button title="Points History" onPress={() => { console.log() }} /></View>
        </View>

        <View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:'80%', alignSelf:'center'}}
            setMoney={price => setMoney(price)}
            value={money}
            keyboardType={'numeric'}
            placeholder='Price of meal here'
          /> 
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
    paddingTop:'12%'
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
});
 
export default RewardScreen;
