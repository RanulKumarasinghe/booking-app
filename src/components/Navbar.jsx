import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';


const Navbar = ({ selectedIndex, navigation }) => {

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

  const useBottomNavigationState = (initialState = 0) => {
    const [selectedIndex, setSelectedIndex] = React.useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
  };

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
            case 1: navigation.navigate('RestaurantList');
              break;
            case 2: navigation.navigate('ReservationPage');
              break;
            case 3: navigation.navigate('Login');
              break;
          }
        }} >
          <BottomNavigationTab icon={HomeIcon} title="Home" />
          <BottomNavigationTab icon={SearchIcon} title="Search" />
          <BottomNavigationTab icon={ClipboardIcon} title="Reservations" />
          <BottomNavigationTab icon={UserIcon} title="User" />
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