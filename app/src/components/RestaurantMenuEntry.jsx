import React from 'react';
import StarRating from 'react-native-star-rating';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Icon} from 'react-native-elements';

const RestaurantMenuEntry = (props) => {
  return (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={props.onSelectItem}>
        <View style={{...styles.listRow, ...styles.listHeader}}>
          <ImageBackground
            source={{uri: props.picture}}
            style={styles.bgImage}
          />
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.listDetail}>
            <View style={styles.listRow}>
              <Text style={styles.list}>{props.name}</Text>
              <Text style={styles.list}>{`£${props.price}`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 350,
    width: '90%',
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
    overflow: 'hidden',
    // marginTop: 1,
    marginLeft: 17,
    justifyContent: 'center',
    // marginBottom: 1
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  listRow: {
    flexDirection: 'row',
  },
  listHeader: {
    height: '85%',
  },
  listDetail: {
    paddingHorizontal: 4,
    alignContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    backgroundColor: '#d9d9d9',
    paddingVertical: 10
  },
  list: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    width: '80%',
  },
  list1: {
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'flex-start',
  },
  starrating: {
    alignSelf: 'flex-end',
    paddingHorizontal: '18%',
  },
  title: {
    // fontFamily: 'open-sans-bold',
    fontWeight: 'bold',
    fontSize: 20,
    // color: 'white',
    textAlign: 'center',
  },
});

export default RestaurantMenuEntry;
