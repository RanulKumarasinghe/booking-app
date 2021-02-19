import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from 'src/navigators/TabNavigator'
import ManagerTabNavigator from 'src/navigators/ManagerTabNavigator'
import { useSelector } from 'react-redux';
import { fetchUserRestaurant } from '@/store/actions/staffRestaurant'
import { useDispatch } from 'react-redux'


export const AppNavigator = () => {
  const isManager = useSelector(state => !!state.staffRestaurant.restaurant);
  const userId = useSelector(state => state.auth.uid);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserRestaurant(userId));
  }, [userId])

  return (
    <NavigationContainer>
      {isManager && <ManagerTabNavigator />}
      {!isManager && <TabNavigator />}
    </NavigationContainer>
  );
}


