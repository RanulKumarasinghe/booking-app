import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

const HomeIcon = (props) => (
  <Icon {...props} name='home-outline' />
);

const SearchIcon = (props) => (
  <Icon {...props} name='search-outline' />
);

const ClipboardIcon = (props) => (
  <Icon {...props} name='clipboard-outline' />
);

const UserIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const navigateMenu = () => {
  navigation.navigate('Menu');
};

const navigateLogin = () => {
  navigation.navigate('Login');
};

const navigateSignUp = () => {
  navigation.navigate('SignUp');
};

const navigateLoading = () => {
  navigation.navigate('Loading');
};

const navigateRestaurants = () => {
  navigation.navigate('Restaurant');
};

const navigateRestaurantList = () => {
  navigation.navigate('RestaurantList');
};

const navigateHome = () => {
  navigation.navigate('Home');
};

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

const Navbar = ({ selectedIndex, navigation }) => {
  const bottomState = useBottomNavigationState();
  return (
    <View>
      <React.Fragment>
        <BottomNavigation 
        style={styles.bottomNavigation} {...bottomState} 
        selectedIndex={selectedIndex} 
        onSelect={(index) => {
          switch (index) {
            case 0: navigation.navigate('Home');
              break;
            case 1: navigation.navigate('Loading');
              break;
            case 2: navigation.navigate('Restaurant');
              break;
            case 3: navigation.navigate('Login');
              break;
          }
        }} >
          <BottomNavigationTab icon={HomeIcon} />
          <BottomNavigationTab icon={SearchIcon} />
          <BottomNavigationTab icon={ClipboardIcon} />
          <BottomNavigationTab icon={UserIcon} />
        </BottomNavigation>
      </React.Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'relative',
    bottom: 0,
    left: 0
  },
});

export default Navbar;