

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const LoadingScreen = ({visible}) => {
  if (visible) {
    return (
      <View style={styles.datePicker}>
        <Spinner />
      </View>
    );
  } else {
    return (<></>)
  }
}

const styles = StyleSheet.create({
  datePicker: {
    marginTop: '1%',
    marginBottom: '1%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default LoadingScreen;