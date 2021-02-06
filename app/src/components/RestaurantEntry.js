import React, { useEffect, useState } from 'react';
import StarRating from 'react-native-star-rating';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';


const RestaurantEntry = props => {
  // const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  // console.log(data.result?.rating);
  // console.log(props.name);
  useEffect(() => {
  const url  = 'https://maps.googleapis.com/maps/api/place/details/json?'
  const place = `place_id=${props.google_id}`;
  const fields = '&fields=rating';
  const key = '&key=AIzaSyAP5rJS__ryEAgiFKsZMtMFDfsltB_1Vyc';
  const restaurantSearchUrl = url + place + fields + key;
  fetch(restaurantSearchUrl)
  .then(response => response.json())
  .then(result => setData(result))
  .catch((error) => console.error(error))
  .finally(() => setLoading(false));
  });


  return (

    <View style={styles.listItem}>
      {isLoading ? <ActivityIndicator/> : (
      <TouchableOpacity onPress={props.onSelectRestaurant}>
        <View>
          <View style={{ ...styles.listRow, ...styles.listHeader }}>
            <ImageBackground
              source={{ uri: props.imageUrl }}
              style={styles.bgImage}
            >

            </ImageBackground>
          </View>
          <View style={styles.titleContainer}>
          <View style={styles.listDetail }>
          <View style={styles.listRow}>
            <Text style={styles.list}>{props.name}</Text>
            <View style={styles.starrating}>
            <StarRating

            disabled={true}
            maxStars={5}
            rating={data.result?.rating}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 300,
    width: '100%',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
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
    paddingVertical: 4
  },
  list: {
    fontWeight: 'bold',
    fontSize: 20,
    width: '65%'
  },
  list1: {
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'flex-start'
  },
  starrating: {
    alignSelf: 'flex-end',
    paddingHorizontal: '15%'
  },
  title: {
    // fontFamily: 'open-sans-bold',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});

export default RestaurantEntry;
