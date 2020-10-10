import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

export const HomeScreen = ({ navigation }) => {

  const navigateMenu = () => {
    navigation.navigate('Menu');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Home' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateMenu}>Open Menu</Button>
      </Layout>
    </SafeAreaView>
  );
};