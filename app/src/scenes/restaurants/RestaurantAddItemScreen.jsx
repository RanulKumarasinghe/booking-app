import React, { useState, setState } from 'react';
import { Switch, SafeAreaView, View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { Text, TopNavigation } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

const MultiTextInput = (props) => {
  return (
    <TextInput
      {...props}
      editable
      maxLength={200}
    />
  );
}

const AddItem = (props) => {
  const dispatch = useDispatch();

}
