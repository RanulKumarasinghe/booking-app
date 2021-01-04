import React, {useState} from "react";
import { SafeAreaView, StyleSheet, Button, Text, TextInput, Image, View } from "react-native";
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSelector } from 'react-redux';

const RewardScreen = (props) => {
  const onAddRestaurant = () => props.navigation.navigate('Add Restaurant');
//This needs additional logic for example  useSelector(state => state.rewards.points);
//points come from the initial state in the reducer
//const currentReward = useSelector(state => state.rewards);

//
  const [money, setMoney] = useState('');
//The code genrated to update points
  const [code, setCode] = useState('');
//Holds points and adds
  const [points, updatePoints] = useState(0);

  function addPoints(){
   updatePoints(points + 1000);
  }

  function addMoney(){
    setMoney();
  }
  // const generateCode = async () => {
  //   // Identify the inputs - money, restaurant_id
  //   if(money >= 0 && restaurant_id === !null ){
  //     function getRandomArbitrary(min, max) {
  //       return Math.random() * (max - min) + min;
  //     }
  //     getRandomArbitrary = callBack(setCode);

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
//   const saveFilters = useCallback(() => {
//     const appliedFilters = {

//     };

//   dispatch(setFilters(appliedFilters));
// }, []);

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
            <Text style={styles.font}>{points}</Text>
          </View>

          <View style={styles.button}><Button title="Use Points" onPress={() => { console.log('Use Points') }} /></View>
          <View style={styles.button}><Button title="Refresh Points" onPress={() => { console.log('Refresh points') }} /></View>
          <View style={styles.button}><Button title="Points History" onPress={() => { console.log('Loading History') }} /></View>
          <View style={styles.button}><Button title="Add Restaurant" onPress={onAddRestaurant} /></View>
        </View>

        <View style={styles.input}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:'80%', alignSelf:'center'}}
            setMoney={price => setMoney(price)}
            value={money}
            keyboardType={'numeric'}
            placeholder='Price of meal here'
          />
          <View style={styles.inputButton}>
            <Button title="Redeem Points" onPress={addPoints} />
          </View>
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
