import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigators/AppNavigator';
import { Provider } from 'react-redux'

import staffRestaurantReducer from '@/store/reducers/staffRestaurant';
import restaurantReducer from '@/store/reducers/restaurants';
import authReducer from '@/store/reducers/auth';
import bookingsReducer from '@/store/reducers/bookings';
import rewardsReducer from '@/store/reducers/rewards';
import menuReducer from '@/store/reducers/menu';
import orderReducer from '@/store/reducers/order';
import foodTypeReducer from '@/store/reducers/foodtypes';
import bookingOrders from '@/store/reducers/bookingOrders'

import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as Font from 'expo-font';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

import LoadingScreen from 'src/scenes/LoadingScreen'

//allow for async in redux stores
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
  staffRestaurant: staffRestaurantReducer,
  restaurants: restaurantReducer,
  auth: authReducer,
  bookings: bookingsReducer,
  rewards: rewardsReducer,
  foodType: foodTypeReducer,
  menu: menuReducer,
  order: orderReducer,
  bookingOrders: bookingOrders
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {

  return (
    <Provider store={store}>
      <LoadingScreen>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} theme={eva.light}>
          <AppNavigator/>
        </ApplicationProvider>
      </LoadingScreen>
    </Provider>
  )
};

export default App;
