import React from 'react';
import StarRating from 'react-native-star-rating';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Icon } from 'react-native-elements';

const RestaurantList = props => {

//  function getVegan () {
//    if(props.vegan === 'Vegan') {
//     return <Icon name='eco' />
//    } else {
//     return null;
//    }
//  }
  return (

    <View style={styles.listItem}>
      <TouchableOpacity onPress={props.onSelectRestaurant}>
        <View>
          <View style={{ ...styles.listRow, ...styles.listHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >

            </ImageBackground>
          </View>
          <View style={styles.titleContainer}>
          <View style={styles.listDetail }>
          <View style={styles.listRow}>
            <Text style={styles.list}>{props.title}</Text>
            <View style={styles.starrating}>
            <StarRating
            disabled={true}
            maxStars={5}
            rating={props.rating}
            fullStarColor={'#dbeb34'}
            starSize={15}

            />
            </View>
            {/* <Text>{props.rating}</Text> */}
          </View>

          <Text style={styles.list1}>{props.type}</Text>
          </View>
          </View>

        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 300,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  listRow: {
    flexDirection: 'row'
  },
  listHeader: {
    height: '75%'
  },
  listDetail: {
    paddingHorizontal: 5,
    alignContent: 'space-between',
    alignItems: 'flex-start',
    height: '25%'
  },
  titleContainer: {
    backgroundColor: '#d9d9d9',
    paddingVertical: 6
  },
  list: {
    fontWeight: 'bold',
    fontSize: 20,
    width: '60%'
  },
  list1: {
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'flex-start'
  },
  starrating: {
    alignSelf: 'flex-end',
    paddingHorizontal: '18%'
  },
  title: {
    // fontFamily: 'open-sans-bold',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});

export default RestaurantList;
