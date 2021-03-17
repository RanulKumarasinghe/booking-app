import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Toggle, Text, Divider, Spinner, Layout, Icon } from '@ui-kitten/components';

const LoginRequired = () => {
  return (
    <View style={styles.datePicker} >
      <View style={styles.error}>
        <Icon style={styles.icon} fill='#8F9BB3' name='alert-triangle-outline' />
      </View>
      <View>
        <Text appearance='hint'>PLEASE LOG IN</Text>
      </View>
    </View>
  );
}

export default LoginRequired

const styles = StyleSheet.create({
  datePicker: {
    marginTop: '1%',
    marginBottom: '1%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
