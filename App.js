import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigators/AppNavigator';
import { Provider } from 'react-redux'

import restaurantReducer from '@/store/reducers/restaurants';
import authReducer from '@/store/reducers/auth';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as Font from 'expo-font';


import LoadingScreen from 'src/scenes/LoadingScreen'

//allow for async in redux stores
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
  restaurants: restaurantReducer,
  auth: authReducer
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